'use strict';

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    'Employee',
    {
      emp_no: { type: DataTypes.INTEGER, primaryKey: true },
      birth_date: DataTypes.DATE,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      gender: DataTypes.ENUM('M', 'F'),
      hire_date: DataTypes.DATE
    },
    {
      freezeTableName: true,
      tableName: 'employees',
      timestamps: false
    }
  );

  return Employee;
};
