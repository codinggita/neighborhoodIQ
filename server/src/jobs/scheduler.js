const cron = require('node-cron');
const syncAQI = require('./syncAQI.job');
const logger = require('../config/logger');

/**
 * Initialize all background jobs
 */
const initScheduler = () => {
  logger.info('⏰ Initializing background job scheduler...');

  // 1. Sync AQI and Weather data (Every hour)
  // '0 * * * *' -> Run at the start of every hour
  cron.schedule('0 * * * *', async () => {
    logger.info('Running scheduled AQI/Weather sync...');
    try {
      await syncAQI();
    } catch (err) {
      logger.error('Error in scheduled sync job:', err);
    }
  });

  // 2. Weekly maintenance (Optional, e.g., Sunday at 3 AM)
  cron.schedule('0 3 * * 0', () => {
    logger.info('Running weekly maintenance tasks...');
    // Add cleanup logic here if needed
  });

  logger.info('✅ Scheduler started. Jobs queued.');
};

module.exports = initScheduler;
