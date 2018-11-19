const { validationResult, check, oneOf } = require('express-validator/check');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json('Invalid parameters');
  } else {
    next();
  }
};

module.exports = {
  getEmployees: [oneOf([check('page').exists(), check('p').exists()]), validate]
};
