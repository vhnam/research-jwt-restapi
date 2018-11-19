const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

let refreshTokens = [];

module.exports = {
  login: async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let accessToken = jwt.sign(
          { username: username },
          process.env.JWT_SECRET,
          {
            expiresIn: '30s'
          }
        );

        let refreshToken = randToken.uid(256);
        refreshTokens[username] = refreshToken;

        res.json({
          message: 'Authentication successful!',
          accessToken: accessToken,
          refreshToken: refreshToken
        });
      } else {
        res.send(403).json({
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
};
