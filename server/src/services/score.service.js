/**
 * score.service.js
 * India-specific neighborhood scoring engine.
 *
 * Weights:
 *  - Air Quality  : 30%
 *  - Safety       : 25%
 *  - Amenities    : 20%
 *  - Education    : 15%
 *  - Transit      : 10%
 */

/**
 * Calculate overall area score (0-100) and a per-category breakdown.
 * @param {Object} metrics  - { aqi: { value }, crimeIndex, weather }
 * @param {Object} amenities - { hospitals, schools, transitHubs, parks }
 * @returns {{ total: number, breakdown: Object }}
 */
const calculateAreaScore = (metrics = {}, amenities = {}) => {
  // ── Air Quality (30%) ─────────────────────────────────────────────────────
  // OpenWeatherMap 1-5 scale: 1 = Good, 5 = Very Poor
  const aqiValue = metrics.aqi?.value || 3;
  const aqiNorm  = ((aqiValue - 1) / 4) * 100;   // 0 = best → 100 = worst
  const aqiScore  = (100 - aqiNorm) * 0.30;

  // ── Safety (25%) ──────────────────────────────────────────────────────────
  // crimeIndex: 0 = very safe, 100 = very dangerous
  const crimeIndex  = metrics.crimeIndex?.value ?? 40;   // default: moderate
  const safetyScore = (100 - crimeIndex) * 0.25;

  // ── Amenities (20%) ───────────────────────────────────────────────────────
  // Normalise: each category capped at 20 places (Google returns max 20)
  const hospitals   = Math.min(amenities.hospitals   || 0, 20);
  const parks       = Math.min(amenities.parks        || 0, 20);
  const amenityNorm = ((hospitals + parks) / 40) * 100;
  const amenityScore = amenityNorm * 0.20;

  // ── Education (15%) ───────────────────────────────────────────────────────
  // schoolRating: 0-5 scale from Google Places (stored in metrics or breakdown)
  const schoolRating  = metrics.schoolRating || 3.5;
  const eduScore      = (schoolRating / 5) * 100 * 0.15;

  // ── Transit (10%) ─────────────────────────────────────────────────────────
  const transitHubs  = Math.min(amenities.transitHubs || 0, 20);
  const transitScore = (transitHubs / 20) * 100 * 0.10;

  // ── Total ─────────────────────────────────────────────────────────────────
  const total = Math.round(aqiScore + safetyScore + amenityScore + eduScore + transitScore);

  return {
    total: Math.min(100, Math.max(0, total)),
    breakdown: {
      airQuality : Math.round(aqiScore),
      safety     : Math.round(safetyScore),
      amenities  : Math.round(amenityScore),
      education  : Math.round(eduScore),
      transit    : Math.round(transitScore),
    },
  };
};

module.exports = { calculateAreaScore };
