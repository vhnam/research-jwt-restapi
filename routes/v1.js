const express = require('express');
const router = express.Router();

const employeeValidator = require('../validators/employee');
const authValidator = require('../validators/auth');
const tokenValidator = require('../validators/token');

const employeeController = require('../controllers/v1/employee');
const authController = require('../controllers/v1/auth');
const tokenController = require('../controllers/v1/token');

const jwtMiddleware = require('../middlewares/jwt');

router.get(
  '/employees',
  jwtMiddleware.checkAccessToken,
  employeeValidator.getEmployees,
  employeeController.getEmployees
);

router.post('/login', authValidator.login, authController.login);

router.post(
  '/token',
  jwtMiddleware.checkRefreshToken,
  tokenValidator.refreshToken,
  tokenController.refreshToken
);

module.exports = router;
