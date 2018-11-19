'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employees', {
      emp_no: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      birth_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM
      },
      hire_date: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('employees');
  }
};
