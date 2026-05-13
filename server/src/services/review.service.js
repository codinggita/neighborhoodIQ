const Review = require('../models/Review.model');

const createReview = async (reviewBody) => {
  return Review.create(reviewBody);
};

const getReviewsByAreaId = async (areaId) => {
  return Review.find({ area: areaId }).populate('user', 'name');
};

module.exports = {
  createReview,
  getReviewsByAreaId,
};
