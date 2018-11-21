import { User } from '../models';
import { encodeBase64, encodeHmacSHA512 } from '../helpers/crypto';

const { promisify } = require('util');
const redis = require('redis');
const jwt = require('jsonwebtoken');

const redisClient = redis.createClient({
  detect_buffers: true,
  expire: process.env.JWT_ACCESS_TOKEN_TIMEOUT * 60
});

const getAsync = promisify(redisClient.get).bind(redisClient);

const saveAccessToken = async (username, token) => {
  redisClient.set(username, token);
};

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
    saveAccessToken(username, accessToken);

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
  },

  getAccessToken: async username => {
    const accessToken = await getAsync(username);
    return accessToken;
  },

  verifySignature: async accessToken => {
    const content = accessToken.split('.');
    const header = content[0];
    const payload = content[1];
    const signature = content[2];

    const encodedSignature = encodeHmacSHA512(
      [encodeBase64(header), encodeBase64(payload)].join('.')
    );

    return signature === encodedSignature;
  },

  deleteAccessToken: async username => {
    redisClient.del(username);
  }
};
