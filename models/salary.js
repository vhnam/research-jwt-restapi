'use strict';

module.exports = (sequelize, DataTypes) => {
  const Salary = sequelize.define(
    'Salary',
    {
      emp_no: { type: DataTypes.INTEGER, primaryKey: true },
      salary_no: { type: DataTypes.INTEGER, primaryKey: true },
      from_date: { type: DataTypes.DATE, primaryKey: true }
    },
    {
      freezeTableName: true,
      tableName: 'salaries',
      timestamps: false
    }
  );

  return Salary;
};
