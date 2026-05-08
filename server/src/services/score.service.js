/**
 * Calculate score based on neighborhood metrics
 * Formula: score = 0.3*(100 - normAQI) + 0.25*(100 - normCrime) + 0.2*normAmenities + 0.15*normSchools + 0.1*normTransit
 * @param {Object} metrics - metrics object from Area model
 * @param {Object} amenities - amenities object from Area model
 * @returns {number} 0-100 score
 */
const calculateAreaScore = (metrics, amenities) => {
  // Normalize AQI (OpenWeatherMap uses 1-5 scale, where 1 is best)
  const aqiValue = metrics.aqi?.value || 3; // Default to moderate if missing
  // Map 1-5 to 0-100 (where 0 is best)
  const normAQI = ((aqiValue - 1) / 4) * 100;
  const aqiScore = (100 - normAQI) * 0.3;

  // Normalize Crime (assume 0-100 scale, where 0 is best)
  const crimeValue = metrics.crimeIndex?.value || 50;
  const normCrime = Math.min(100, crimeValue);
  const safetyScore = (100 - normCrime) * 0.25;

  // Amenities score (normalize count to 0-10, where 10+ is max)
  const normAmenities = Math.min(100, (amenities.hospitals || 0) * 10);
  const amenityScore = normAmenities * 0.2;

  // Education score
  const normSchools = Math.min(100, (amenities.schools || 0) * 5);
  const schoolScore = normSchools * 0.15;

  // Transit score
  const normTransit = Math.min(100, (amenities.transitHubs || 0) * 20);
  const transitScore = normTransit * 0.1;

  const totalScore = aqiScore + safetyScore + amenityScore + schoolScore + transitScore;
  
  return {
    total: Math.round(totalScore * 10) / 10,
    breakdown: {
      airQuality: Math.round(aqiScore * 10) / 10,
      safety: Math.round(safetyScore * 10) / 10,
      amenities: Math.round(amenityScore * 10) / 10,
      education: Math.round(schoolScore * 10) / 10,
      transit: Math.round(transitScore * 10) / 10,
    }
  };
};

module.exports = {
  calculateAreaScore,
};
