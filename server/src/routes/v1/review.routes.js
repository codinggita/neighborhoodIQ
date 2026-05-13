const express = require('express');
const auth = require('../../middleware/auth.middleware');
const reviewController = require('../../controllers/review.controller');

const router = express.Router();

router.get('/:areaId', reviewController.getAreaReviews);
router.post('/:areaId', auth(), reviewController.createReview);

module.exports = router;
