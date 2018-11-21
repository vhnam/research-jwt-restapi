const express = require('express');
const router = express.Router();

const employeeValidator = require('../validators/employee');
const authValidator = require('../validators/auth');
const tokenValidator = require('../validators/token');

const employeeController = require('../controllers/v1/employee');
const authController = require('../controllers/v1/auth');
const tokenController = require('../controllers/v1/token');

const jwtMiddleware = require('../middlewares/jwt');

/**
 * Get employee
 */
router.get(
  '/employees',
  jwtMiddleware.checkAccessToken,
  employeeValidator.getEmployees,
  employeeController.getEmployees
);

/**
 * Authentication
 */
router.post('/login', authValidator.login, authController.login);
router.get(
  '/logout',
  authValidator.logout,
  jwtMiddleware.checkAccessToken,
  jwtMiddleware.extractPayload,
  authController.logout
);

/**
 * Token
 */
router.post(
  '/token',
  tokenValidator.refreshAccessToken,
  jwtMiddleware.checkRefreshToken,
  tokenController.refreshAccessToken
);

module.exports = router;
