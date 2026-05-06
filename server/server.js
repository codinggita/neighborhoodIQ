const app = require('./src/app');
const config = require('./src/config/env');
const logger = require('./src/config/logger');
const connectDB = async () => {
  const mongoose = require('mongoose');
  try {
    const conn = await mongoose.connect(config.mongoose.url, config.mongoose.options);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const setupJobs = require('./src/jobs/scheduler');

let server;
connectDB().then(() => {
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
    setupJobs();
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
