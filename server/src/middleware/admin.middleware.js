const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Middleware to check if the user has an admin role
 */
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new ApiError(httpStatus.FORBIDDEN, 'Admin access required'));
  }
  next();
};

module.exports = adminOnly;