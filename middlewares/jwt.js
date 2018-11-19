const jwt = require('jsonwebtoken');

const checkAccessToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(400).json({
      message: 'Missing token'
    });
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
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
  } else {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
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

module.exports = {
  checkAccessToken: checkAccessToken,
  checkRefreshToken: checkRefreshToken
};
