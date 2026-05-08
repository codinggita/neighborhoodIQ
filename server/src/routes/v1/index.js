const express = require('express');
const authRoute = require('./auth.routes');
const areaRoute = require('./area.routes');
const reviewRoute = require('./review.routes');
const userRoute = require('./user.routes');
const adminRoute = require('./admin.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/areas',
    route: areaRoute,
  },
  {
    path: '/reviews',
    route: reviewRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
