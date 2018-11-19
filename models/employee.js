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

  Employee.associate = models => {
    Employee.belongsToMany(models.DeptEmp, {
      through: 'DeptEmp',
      foreignKey: 'emp_no'
    });
    Employee.belongsToMany(models.DeptManager, {
      through: 'DeptManager',
      foreignKey: 'emp_no'
    });
    Employee.belongsToMany(models.Title, {
      through: 'Title',
      foreignKey: 'emp_no'
    });
    Employee.belongsToMany(models.Salary, {
      through: 'Salary',
      foreignKey: 'emp_no'
    });
  };

  return Employee;
};
