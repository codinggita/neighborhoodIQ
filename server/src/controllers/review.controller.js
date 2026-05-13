const httpStatus = require('http-status');
const asyncHandler = require('../utils/asyncHandler');
const { reviewService } = require('../services');

const createReview = asyncHandler(async (req, res) => {
  const reviewBody = {
    ...req.body,
    user: req.user.id,
    area: req.params.areaId,
  };
  const review = await reviewService.createReview(reviewBody);
  res.status(httpStatus.CREATED).send(review);
});

const getAreaReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getReviewsByAreaId(req.params.areaId);
  res.send(reviews);
});

module.exports = {
  createReview,
  getAreaReviews,
};
