const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoose: {
    url: process.env.MONGO_URI,
    options: {}
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || 30,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || 30,
  },
  apiKeys: {
    openaq: process.env.OPENAQ_API_KEY,
    google: process.env.GOOGLE_PLACES_API_KEY,
    mapmyindia: process.env.MAPMYINDIA_API_KEY,
    openweather: process.env.OPENWEATHER_API_KEY
  }
};

module.exports = config;
