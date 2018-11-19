'use strict';

module.exports = (sequelize, DataTypes) => {
  const DeptEmp = sequelize.define(
    'DeptEmp',
    {
      dept_no: DataTypes.INTEGER,
      emp_no: DataTypes.INTEGER,
      from_date: DataTypes.DATE,
      to_date: DataTypes.DATE
    },
    {
      freezeTableName: true,
      tableName: 'dept_emp',
      timestamps: false
    }
  );

  return DeptEmp;
};
