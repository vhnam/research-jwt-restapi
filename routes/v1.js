const express = require('express');
const router = express.Router();

const employeeValidator = require('../validators/employee');
const authValidator = require('../validators/auth');

const employeeController = require('../controllers/v1/employee');
const authController = require('../controllers/v1/auth');

const jwtMiddleware = require('../middlewares/jwt');

router.get(
  '/employees',
  jwtMiddleware.checkToken,
  employeeValidator.getEmployees,
  employeeController.getEmployees
);

router.post('/login', authValidator.login, authController.login);

module.exports = router;
