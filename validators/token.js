const { validationResult, header } = require('express-validator/check');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json('Invalid parameters');
  } else {
    next();
  }
};

module.exports = {
  rejectToken: [
    //
    validate
  ],
  refreshToken: [
    [
      header('x-access-token')
        .not()
        .isEmpty(),
      header('x-refresh-token')
        .not()
        .isEmpty()
    ],
    validate
  ]
};
