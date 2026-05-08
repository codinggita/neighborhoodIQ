const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const config = require('../config/env');
const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');

const auth = (requiredRole) => async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    const user = await User.findById(payload.sub);

    if (!user) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }

    if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
      return next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
};

module.exports = auth;
