const employee = require('./employee');
const token = require('./token');
const auth = require('./auth');

module.exports = {
  employeeService: employee,
  tokenService: token,
  authService: auth
};
