const express = require("express");
const router = express.Router();

const employeeValidator = require("../validators/employee");

const employeeController = require("../controllers/v1/employee");

router.get(
  "/employees",
  employeeValidator.getEmployees,
  employeeController.getEmployees
);

module.exports = router;
