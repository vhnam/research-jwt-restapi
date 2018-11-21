import { User } from '../models';

const jwt = require('jsonwebtoken');

module.exports = {
  generateAccessToken: async (id, username, role) => {
    const accessToken = jwt.sign(
      {
        id: id,
        username: username,
        role: role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_TIMEOUT
      }
    );

    return accessToken;
  },

  generateRefreshToken: async username => {
    const refreshToken = jwt.sign(
      {
        username: username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_TIMEOUT
      }
    );

    global.refreshTokens[username] = refreshToken;
    return refreshToken;
  },

  getRefreshToken: async (id, refreshToken) => {
    const user = await User.find({
      attributes: ['refreshToken'],
      where: {
        id: id,
        refreshToken: refreshToken,
        isLogin: true
      }
    });

    if (!user) {
      throw new Error('Invalid token');
    }

    return user.refreshToken;
  }
};
