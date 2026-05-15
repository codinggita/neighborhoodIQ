const express = require('express');
const auth = require('../../middleware/auth.middleware');
const adminOnly = require('../../middleware/admin.middleware');
const adminController = require('../../controllers/admin.controller');

const router = express.Router();

router.use(auth());
router.use(adminOnly);

router.get('/stats', adminController.getStats);
router.get('/areas', adminController.getAreasAdmin);
router.get('/users', adminController.getUsersAdmin);
router.get('/analytics', adminController.getAnalytics);
router.get('/reviews', adminController.getRecentReviews);
router.post('/refresh', adminController.triggerSync);
router.get('/logs', adminController.getAuditLogs);

router.patch('/areas/:areaId', adminController.updateArea);
router.patch('/users/:userId', adminController.updateUserAdmin);
router.patch('/reviews/:reviewId', adminController.updateReviewStatus);

router.delete('/areas/:areaId', adminController.deleteArea);

module.exports = router;
