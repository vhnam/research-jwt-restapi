'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
      isLogin: DataTypes.BOOLEAN
    },
    {
      timestamps: false
    }
  );

  return User;
};
