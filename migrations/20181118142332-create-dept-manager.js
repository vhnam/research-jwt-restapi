"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("dept_manager", {
      dept_no: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      emp_no: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      from_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      to_date: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("dept_manager");
  }
};
