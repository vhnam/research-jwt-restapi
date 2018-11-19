"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("salaries", {
      emp_no: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      salary: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      from_date: {
        primaryKey: true,
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
    return queryInterface.dropTable("salaries");
  }
};
