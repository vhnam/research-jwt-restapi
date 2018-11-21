import { User } from '../models';

module.exports = {
  login: async (username, password) => {
    const user = await User.find({
      attributes: ['id', 'username', 'role'],
      where: {
        username: username,
        password: password
      }
    });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    return user;
  },

  updateStateAfterLogin: async (id, refreshToken) => {
    User.find({
      where: { id }
    }).then(async user => {
      user.refreshToken = refreshToken;
      user.isLogin = true;
      await user.save();
    });
  },

  logout: async payload => {
    User.find({
      where: { id: payload.id }
    }).then(async user => {
      user.refreshToken = null;
      user.isLogin = false;
      await user.save();
    });
  }
};
