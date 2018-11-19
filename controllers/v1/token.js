import { tokenService } from '../../services';

const jwt = require('jsonwebtoken');

module.exports = {
  refreshToken: async (req, res) => {
    try {
      const username = req.username;
      const accessToken = await tokenService.generateAccessToken({
        username: username
      });

      res.status(201).json({ accessToken: accessToken });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  rejectToken: async (req, res) => {
    try {
      const accessToken = req.headers['x-access-token'];
      const username = jwt.decode(accessToken).username;
      delete global.refreshTokens[username];
      res.send(204);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
