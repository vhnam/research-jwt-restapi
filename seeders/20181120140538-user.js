'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: 'password',
        role: 'admin',
        isLogin: false
      },
      {
        username: 'moderator',
        password: 'password',
        role: 'moderator',
        isLogin: false
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
