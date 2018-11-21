import { tokenService } from '../services';

const jwt = require('jsonwebtoken');

const checkAccessToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(400).json({
      message: 'Missing token'
    });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid token'
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

const checkRefreshToken = async (req, res, next) => {
  const payload = req.payload;
  const refreshToken = req.headers['x-refresh-token'];
  try {
    const isMatching = await tokenService.getRefreshToken(
      payload.id,
      refreshToken
    );

    if (isMatching) {
      next();
    } else {
      throw new Error('Invalid token');
    }
  } catch (error) {
    console.log(error.stack);
    return res.status(401).json({
      message: error.message
    });
  }
};

const getPayload = (req, res, next) => {
  const accessToken = req.headers['x-access-token'];
  const content = jwt.decode(accessToken, { complete: true });
  req.payload = content.payload;
  next();
};

module.exports = {
  checkAccessToken: checkAccessToken,
  checkRefreshToken: checkRefreshToken,
  getPayload: getPayload
};
