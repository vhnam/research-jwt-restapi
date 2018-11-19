'use strict';

module.exports = (sequelize, DataTypes) => {
  const Title = sequelize.define(
    'Title',
    {
      emp_no: { type: DataTypes.INTEGER, primaryKey: true },
      title: { type: DataTypes.STRING, primaryKey: true },
      from_date: { type: DataTypes.DATE, primaryKey: true }
    },
    {
      freezeTableName: true,
      tableName: 'titles',
      timestamps: false
    }
  );

  return Title;
};
