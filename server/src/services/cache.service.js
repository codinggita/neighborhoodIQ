/**
 * cache.service.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Cache-First wrapper around all Google / Nominatim API calls.
 *
 * Strategy:
 *  1. Check MongoDB cache first.
 *  2. If cache HIT  → return cached data instantly (0 API calls).
 *  3. If cache MISS → call external API, save result, return it.
 *
 * This protects your $200 Google free-tier credits.
 */

const axios    = require('axios');
const config   = require('../config/env');
const logger   = require('../config/logger');
const GeoCache    = require('../models/GeoCache.model');
const PlacesCache = require('../models/PlacesCache.model');

// Round coordinates to 3dp (~111m) for cache key normalisation
const round3 = (n) => Math.round(n * 1000) / 1000;

// ─────────────────────────────────────────────────────────────────────────────
// GEOCODING  (Cache-First)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get lat/lon for a place name.
 * Checks MongoDB → Google Geocoding → Nominatim (OSM).
 *
 * @param {string} name  - neighbourhood name, e.g. "Koramangala"
 * @param {string} city  - city, e.g. "Bengaluru"
 * @returns {Promise<{ lat, lon, source } | null>}
 */
const geocode = async (name, city) => {
  const queryKey = `${name}, ${city}, India`.toLowerCase();

  // 1️⃣  Check MongoDB cache
  const cached = await GeoCache.findOne({ query: queryKey });
  if (cached) {
    logger.info(`[GeoCache HIT] ${queryKey}`);
    return { lat: cached.lat, lon: cached.lon, source: cached.source };
  }

  logger.info(`[GeoCache MISS] ${queryKey} — calling APIs`);

  // 2️⃣  Try Google Geocoding
  if (config.apiKeys.google) {
    try {
      const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: { address: `${name}, ${city}, India`, key: config.apiKeys.google },
        timeout: 5000,
      });

      if (res.data.status === 'OK' && res.data.results.length > 0) {
        const loc = res.data.results[0].geometry.location;
        const result = { lat: loc.lat, lon: loc.lng, source: 'google' };
        await _saveGeoCache(queryKey, result);
        return result;
      }
      logger.warn(`[Google Geocode] ${res.data.status} for "${queryKey}"`);
    } catch (err) {
      logger.warn(`[Google Geocode] Error: ${err.message}`);
    }
  }

  // 3️⃣  Fallback: Nominatim (OpenStreetMap) — FREE, no key needed
  try {
    const res = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: { q: `${name}, ${city}, India`, format: 'json', limit: 1 },
      headers: { 'User-Agent': 'NeighborhoodIQ/1.0 (dev@neighborhoodiq.in)' },
      timeout: 8000,
    });

    if (res.data && res.data.length > 0) {
      const result = {
        lat: parseFloat(res.data[0].lat),
        lon: parseFloat(res.data[0].lon),
        source: 'nominatim',
      };
      await _saveGeoCache(queryKey, result);
      return result;
    }
  } catch (err) {
    logger.error(`[Nominatim] Error: ${err.message}`);
  }

  logger.error(`[Geocode] Could not resolve "${queryKey}"`);
  return null;
};

/** Internal: persist geocode result */
const _saveGeoCache = async (query, { lat, lon, source }) => {
  try {
    await GeoCache.findOneAndUpdate(
      { query },
      { lat, lon, source },
      { upsert: true, new: true }
    );
    logger.info(`[GeoCache SAVE] ${query} → (${lat}, ${lon}) via ${source}`);
  } catch (err) {
    logger.warn(`[GeoCache] Save failed: ${err.message}`);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PLACES / AMENITIES  (Cache-First)
// ─────────────────────────────────────────────────────────────────────────────

const AMENITY_TYPES = {
  hospitals:   'hospital',
  schools:     'school',
  transitHubs: 'transit_station',
  parks:       'park',
};

/**
 * Get amenity counts near a coordinate.
 * Checks MongoDB cache per type → Google Places API → saves result.
 *
 * @param {number} lat
 * @param {number} lon
 * @param {number} radius - metres (default 2500)
 * @returns {Promise<{ hospitals, schools, transitHubs, parks, schoolRating }>}
 */
const getAmenities = async (lat, lon, radius = 2500) => {
  const rLat = round3(lat);
  const rLon = round3(lon);

  const result = { hospitals: 0, schools: 0, transitHubs: 0, parks: 0, schoolRating: 3.5 };

  if (!config.apiKeys.google) {
    logger.warn('[PlacesCache] Google API key missing — returning defaults');
    return result;
  }

  for (const [key, type] of Object.entries(AMENITY_TYPES)) {
    // 1️⃣  Check cache
    const cached = await PlacesCache.findOne({ lat: rLat, lon: rLon, type });
    if (cached) {
      logger.info(`[PlacesCache HIT] ${type} @ (${rLat},${rLon})`);
      result[key] = cached.count;
      if (type === 'school' && cached.avgRating) result.schoolRating = cached.avgRating;
      continue;
    }

    logger.info(`[PlacesCache MISS] ${type} @ (${rLat},${rLon}) — calling Google Places`);

    // 2️⃣  Call Google Places API
    try {
      const res = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: { location: `${lat},${lon}`, radius, type, key: config.apiKeys.google },
        timeout: 8000,
      });

      let count = 0;
      let avgRating;

      if (res.data.status === 'OK') {
        count = res.data.results.length;

        if (type === 'school') {
          const ratings = res.data.results.map((p) => p.rating).filter(Boolean);
          if (ratings.length > 0) {
            avgRating = parseFloat((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2));
          }
        }
      } else if (res.data.status !== 'ZERO_RESULTS') {
        logger.warn(`[Google Places] ${res.data.status} for ${type} @ (${rLat},${rLon})`);
      }

      // 3️⃣  Save to cache
      await PlacesCache.findOneAndUpdate(
        { lat: rLat, lon: rLon, type },
        {
          count,
          ...(avgRating !== undefined && { avgRating }),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
        { upsert: true, new: true }
      );
      logger.info(`[PlacesCache SAVE] ${type} @ (${rLat},${rLon}) → count=${count}`);

      result[key] = count;
      if (type === 'school' && avgRating) result.schoolRating = avgRating;

      // Polite delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 250));
    } catch (err) {
      logger.error(`[Google Places] Error for ${type}: ${err.message}`);
    }
  }

  return result;
};

// ─────────────────────────────────────────────────────────────────────────────
// WEATHER & AQI  (Cache-First with short TTL via externalApi.service)
// ─────────────────────────────────────────────────────────────────────────────
// Weather data changes hourly so we cache it inside the Area document itself
// (metrics.aqi.lastUpdated, metrics.weather.lastUpdated).
// The sync job checks lastUpdated before calling the API.

module.exports = { geocode, getAmenities };
