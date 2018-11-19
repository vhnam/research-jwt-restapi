const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

module.exports = {
  generateAccessToken: async body => {
    const accessToken = jwt.sign(body, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT
    });

    return accessToken;
  },

  generateRefreshToken: async username => {
    let refreshToken = randToken.uid(256);
    global.refreshTokens[username] = refreshToken;
    return refreshToken;
  }
};
