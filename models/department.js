"use strict";
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
    {
      dept_no: { type: DataTypes.STRING, primaryKey: true },
      dept_name: DataTypes.STRING
    },
    {
      freezeTableName: true,
      tableName: "departments",
      timestamps: false
    }
  );

  Department.associate = models => {
    Department.belongsToMany(models.Employee, {
      through: "DeptEmp",
      foreignKey: "dept_no"
    });
    Department.belongsToMany(models.Employee, {
      through: "DeptManager",
      foreignKey: "dept_no"
    });
  };

  return Department;
};
