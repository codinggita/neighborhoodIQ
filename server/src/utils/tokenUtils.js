const jwt = require('jsonwebtoken');
const config = require('../config/env');

const generateToken = (userId, expires, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(expires / 1000),
  };
  return jwt.sign(payload, secret);
};

const verifyToken = (token, secret = config.jwt.secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  generateToken,
  verifyToken,
};
