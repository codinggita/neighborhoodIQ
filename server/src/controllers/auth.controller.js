const httpStatus = require('http-status');
const asyncHandler = require('../utils/asyncHandler');
const { authService } = require('../services'); // I'll create services index next
const { generateToken } = require('../utils/tokenUtils');
const config = require('../config/env');

const register = asyncHandler(async (req, res) => {
  const user = await authService.createUser(req.body);
  const expires = Date.now() + config.jwt.accessExpirationMinutes * 60 * 1000;
  const token = generateToken(user.id, expires);
  res.status(httpStatus.CREATED).send({ user, token });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const expires = Date.now() + config.jwt.accessExpirationMinutes * 60 * 1000;
  const token = generateToken(user.id, expires);
  res.send({ user, token });
});

module.exports = {
  register,
  login,
};
