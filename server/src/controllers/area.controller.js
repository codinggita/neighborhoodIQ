const httpStatus = require('http-status');
const asyncHandler = require('../utils/asyncHandler');
const { areaService, scoreService, externalApiService } = require('../services');
const ApiError = require('../utils/ApiError');

const searchAreas = asyncHandler(async (req, res) => {
  const { q, city, limit = 10, page = 1 } = req.query;
  const filter = {};
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (city) filter.city = city;

  const areas = await areaService.queryAreas(filter, { limit, page });
  res.send({ results: areas, page, limit, totalResults: areas.length });
});

const getAreaById = asyncHandler(async (req, res) => {
  const area = await areaService.getAreaById(req.params.id);
  if (!area) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Area not found');
  }

  // Optionally refresh data if stale (e.g., > 1 hour old)
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  if (!area.metrics.aqi.lastUpdated || area.metrics.aqi.lastUpdated < oneHourAgo) {
    const aqi = await externalApiService.fetchLatestAqi(area.city);
    if (aqi) area.metrics.aqi = aqi;
    
    const weather = await externalApiService.fetchCurrentWeather(area.city);
    if (weather) area.metrics.weather = weather;

    // Recalculate score
    const scoreResult = scoreService.calculateAreaScore(area.metrics, area.amenities);
    area.score = scoreResult.total;
    area.scoreBreakdown = scoreResult.breakdown;
    await area.save();
  }

  res.send(area);
});

const compareAreas = asyncHandler(async (req, res) => {
  const { area1Id, area2Id } = req.query;
  const area1 = await areaService.getAreaById(area1Id);
  const area2 = await areaService.getAreaById(area2Id);

  if (!area1 || !area2) {
    throw new ApiError(httpStatus.NOT_FOUND, 'One or both areas not found');
  }

  res.send({ area1, area2 });
});

module.exports = {
  searchAreas,
  getAreaById,
  compareAreas,
};
