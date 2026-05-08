const Area = require('../models/Area.model');
const { externalApiService, cacheService, scoreService } = require('../services');
const logger = require('../config/logger');

/**
 * Synchronize AQI and Weather for all areas in the database.
 * This job is designed to be run periodically (e.g., every hour).
 */
const syncAllAreas = async () => {
  logger.info('🚀 Starting AQI and Weather synchronization...');
  
  try {
    const areas = await Area.find({});
    logger.info(`Found ${areas.length} areas to sync.`);

    let successCount = 0;
    let failCount = 0;

    for (const area of areas) {
      try {
        // 1. Get city name for API call
        const cityName = area.city;
        
        // 2. Fetch live data from OpenWeatherMap (via service)
        // Note: fetchCityData handles OWM call and fallback to Open-Meteo
        const liveData = await externalApiService.fetchCityData(cityName);

        if (liveData) {
          const { weather, aqi, coords } = liveData;

          // 3. Update coordinates if they are missing or [0,0]
          if (coords && (!area.location.coordinates || (area.location.coordinates[0] === 0 && area.location.coordinates[1] === 0))) {
            area.location = {
              type: 'Point',
              coordinates: [coords.lon, coords.lat]
            };
          }

          // 4. Update metrics
          if (weather) area.metrics.weather = weather;
          if (aqi) area.metrics.aqi = aqi;

          // 5. Fetch Amenities if they are missing (using cache-first strategy)
          // We only fetch amenities if the coordinates are valid
          if (area.location.coordinates[0] !== 0) {
            const amenities = await cacheService.getAmenities(
              area.location.coordinates[1],
              area.location.coordinates[0]
            );
            
            if (amenities) {
              area.amenities = {
                hospitals: amenities.hospitals,
                schools: amenities.schools,
                transitHubs: amenities.transitHubs,
                parks: amenities.parks
              };
              area.metrics.schoolRating = amenities.schoolRating;
            }
          }

          // 6. Recalculate Score
          const scoreResult = scoreService.calculateAreaScore(area.metrics, area.amenities);
          area.score = scoreResult.total;
          area.scoreBreakdown = scoreResult.breakdown;

          await area.save();
          successCount++;
        } else {
          logger.warn(`No data returned for ${area.name}, ${area.city}`);
          failCount++;
        }

        // Polite delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (err) {
        logger.error(`Failed to sync area ${area.name}: ${err.message}`);
        failCount++;
      }
    }

    logger.info(`✅ Synchronization complete. Success: ${successCount}, Failed: ${failCount}`);
  } catch (error) {
    logger.error(`Critical error in sync job: ${error.message}`);
  }
};

module.exports = syncAllAreas;
