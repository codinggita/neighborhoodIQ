const express = require('express');
const auth = require('../../middleware/auth.middleware');
const adminOnly = require('../../middleware/admin.middleware');
const adminController = require('../../controllers/admin.controller');

const router = express.Router();

// Apply authentication and admin check to all admin routes
router.use(auth());
router.use(adminOnly);

router.get('/stats', adminController.getStats);
router.get('/reviews', adminController.getRecentReviews);
router.delete('/areas/:areaId', adminController.deleteArea);
router.delete('/reviews/:reviewId', adminController.deleteReview);

module.exports = router;
