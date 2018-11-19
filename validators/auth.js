const { validationResult, body } = require('express-validator/check');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json('Invalid parameters');
  } else {
    next();
  }
};

module.exports = {
  login: [
    [
      body('username')
        .not()
        .isEmpty(),
      body('password')
        .not()
        .isEmpty()
    ],
    validate
  ]
};
