"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("titles", {
      emp_no: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        primaryKey: true,
        type: Sequelize.STRING
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
    return queryInterface.dropTable("titles");
  }
};
