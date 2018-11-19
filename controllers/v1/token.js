const jwt = require('jsonwebtoken');

module.exports = {
  refreshToken: async (req, res) => {
    try {
      const username = req.username;
      let accessToken = jwt.sign(
        { username: username },
        process.env.JWT_SECRET,
        {
          expiresIn: '30s'
        }
      );

      res.status(201).json({ accessToken: accessToken });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
