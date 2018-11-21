import { tokenService, authService } from '../../services';

module.exports = {
  refreshAccessToken: async (req, res) => {
    try {
      const payload = req.payload;
      const accessToken = req.headers['x-access-token'];

      if (!tokenService.verifySignature(accessToken)) {
        throw new Error('Invalid token');
      }

      const refreshToken = await tokenService.generateRefreshToken(
        payload.username
      );

      Promise.all([
        authService.updateStateAfterLogin(payload.id, refreshToken),
        tokenService.generateAccessToken(
          payload.id,
          payload.username,
          payload.role
        )
      ]).then(values => {
        const accessToken = values[1];

        res.status(200).json({
          accessToken: accessToken,
          refreshToken: refreshToken
        });
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
