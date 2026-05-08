/**
 * externalApi.service.js
 * Fetches live Weather and AQI data from OpenWeatherMap (primary)
 * with Open-Meteo as fallback.
 */
const axios  = require('axios');
const config = require('../config/env');
const logger = require('../config/logger');

/**
 * Fetch weather + AQI data for a city.
 * @param {string} city - City name (e.g. "Mumbai")
 * @returns {Promise<{ weather, aqi, coords } | null>}
 */
const fetchCityData = async (city) => {
  if (!config.apiKeys.openweather) {
    logger.warn('[OWM] OPENWEATHER_API_KEY not set');
    return null;
  }

  try {
    // 1. Current weather (also gives us lat/lon)
    const weatherRes = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: `${city},IN`, appid: config.apiKeys.openweather, units: 'metric' },
      timeout: 8000,
    });

    const wd  = weatherRes.data;
    const { lat, lon } = wd.coord;

    // 2. Air Pollution
    const aqiRes = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {
      params: { lat, lon, appid: config.apiKeys.openweather },
      timeout: 8000,
    });

    const aqiData = aqiRes.data.list[0];

    return {
      weather: {
        temp:        wd.main.temp,
        condition:   wd.weather[0].main,
        humidity:    wd.main.humidity,
        lastUpdated: new Date(),
      },
      aqi: {
        value:       aqiData.main.aqi,   // 1-5 (Good → Very Poor)
        components:  aqiData.components,
        lastUpdated: new Date(),
      },
      coords: { lat, lon },
    };
  } catch (err) {
    logger.warn(`[OWM] Failed for "${city}": ${err.response?.data?.message || err.message} — trying fallback`);
    return await _fetchFallback(city);
  }
};

/** Open-Meteo fallback (free, no key) */
const _fetchFallback = async (city) => {
  try {
    const geoRes = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: { name: city, count: 1 },
      timeout: 8000,
    });

    if (!geoRes.data.results?.length) throw new Error('City not found');

    const { latitude: lat, longitude: lon } = geoRes.data.results[0];

    const wxRes = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: { latitude: lat, longitude: lon, current: 'temperature_2m,weather_code', timezone: 'auto' },
      timeout: 8000,
    });

    return {
      weather: {
        temp:        wxRes.data.current.temperature_2m,
        condition:   _codeToCondition(wxRes.data.current.weather_code),
        lastUpdated: new Date(),
      },
      aqi:    null,
      coords: { lat, lon },
    };
  } catch (err) {
    logger.error(`[Open-Meteo fallback] Failed for "${city}": ${err.message}`);
    return null;
  }
};

const _codeToCondition = (code) => {
  if (code === 0)   return 'Clear';
  if (code <= 3)    return 'Clouds';
  if (code <= 48)   return 'Fog';
  if (code <= 55)   return 'Drizzle';
  if (code <= 65)   return 'Rain';
  if (code <= 82)   return 'Showers';
  return 'Clouds';
};

module.exports = {
  fetchCityData,
  fetchLatestAqi:      async (city) => (await fetchCityData(city))?.aqi    ?? null,
  fetchCurrentWeather: async (city) => (await fetchCityData(city))?.weather ?? null,
};
