'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: {
      allowNull: false,
      type: DataTypes.STRING(20),
      unique: true
    },
  }, {});
  Category.associate = function (models) {

  };
  return Category;
};
