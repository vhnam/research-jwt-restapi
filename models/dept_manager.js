"use strict";
module.exports = (sequelize, DataTypes) => {
  const DeptManager = sequelize.define(
    "DeptManager",
    {
      dept_no: DataTypes.INTEGER,
      emp_no: DataTypes.STRING,
      from_date: DataTypes.DATE,
      to_date: DataTypes.DATE
    },
    {
      freezeTableName: true,
      tableName: "dept_manager",
      timestamps: false
    }
  );

  return DeptManager;
};
