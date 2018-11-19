import { tokenService } from '../../services';

module.exports = {
  login: async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        const refreshToken = await tokenService.generateRefreshToken(username);
        const accessToken = await tokenService.generateAccessToken({
          username: username
        });

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
