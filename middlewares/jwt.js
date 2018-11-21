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

const checkRefreshToken = (req, res, next) => {
  const refreshToken = req.headers['x-refresh-token'];
  const accessToken = req.headers['x-access-token'];

  const accessTokenContent = jwt.decode(accessToken);
  const username = accessTokenContent.username;
  const storedRefreshToken = global.refreshTokens[username];

  if (storedRefreshToken && refreshToken === storedRefreshToken) {
    req.username = username;
    next();
  } else {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
};

const extractPayload = (req, res, next) => {
  const accessToken = req.headers['x-access-token'];
  const content = jwt.decode(accessToken, { complete: true });
  req.payload = content.payload;
  next();
};

module.exports = {
  checkAccessToken: checkAccessToken,
  checkRefreshToken: checkRefreshToken,
  extractPayload: extractPayload
};
