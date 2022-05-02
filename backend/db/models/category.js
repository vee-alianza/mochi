'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
  }, {});
  Category.associate = function (models) {
    Category.hasMany(models.Story, { foreignKey: "categoryId" });
  };
  return Category;
};
