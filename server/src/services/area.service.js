const Area = require('../models/Area.model');

const queryAreas = async (filter, options) => {
  const areas = await Area.find(filter);
  return areas;
};

const getAreaById = async (id) => {
  return Area.findById(id);
};

module.exports = {
  queryAreas,
  getAreaById,
};
