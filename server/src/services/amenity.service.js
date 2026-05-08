/**
 * amenity.service.js
 * Fetches real amenity counts near a location using cache.service
 * (MongoDB cache → Google Places API).
 */
const cacheService = require('./cache.service');
const logger       = require('../config/logger');

/**
 * @param {number} lat
 * @param {number} lon
 * @param {number} radius - metres (default 2500)
 */
const fetchAmenityCounts = async (lat, lon, radius = 2500) => {
  try {
    return await cacheService.getAmenities(lat, lon, radius);
  } catch (err) {
    logger.error(`[AmenityService] Error: ${err.message}`);
    return { hospitals: 0, schools: 0, transitHubs: 0, parks: 0, schoolRating: 3.5 };
  }
};

module.exports = { fetchAmenityCounts };
