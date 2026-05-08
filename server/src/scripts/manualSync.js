const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the root .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

const syncAQI = require('../jobs/syncAQI.job');
const logger = require('../config/logger');

const runManualSync = async () => {
  logger.info('🔗 Connecting to MongoDB for manual sync...');
  
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    await mongoose.connect(mongoUri);
    logger.info('✅ Database connected.');

    logger.info('⏳ Starting manual synchronization for all areas...');
    await syncAQI();
    logger.info('✨ Manual synchronization task finished.');

    process.exit(0);
  } catch (error) {
    logger.error(`❌ Manual sync failed: ${error.message}`);
    process.exit(1);
  }
};

runManualSync();
