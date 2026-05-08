const express = require('express');
const areaController = require('../../controllers/area.controller');

const router = express.Router();

router.get('/', areaController.getAreas);
router.get('/search', areaController.searchAreas);
router.get('/compare', areaController.compareAreas);
router.get('/:id', areaController.getAreaById);

module.exports = router;
