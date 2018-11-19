"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("departments", {
      dept_no: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      dept_name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("departments");
  }
};
