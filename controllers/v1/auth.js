import { tokenService, authService } from '../../services';

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await authService.login(username, password);

      if (user) {
        const refreshToken = await tokenService.generateRefreshToken(username);

        Promise.all([
          authService.updateStateAfterLogin(user.id, refreshToken),
          tokenService.generateAccessToken(user.id, username, user.role)
        ]).then(values => {
          const accessToken = values[1];

          res.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken
          });
        });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      const payload = req.payload;
      Promise.all([
        authService.logout(payload),
        tokenService.deleteAccessToken(payload.username)
      ]).then(() => {
        res.status(200).json({ message: 'OK' });
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};
