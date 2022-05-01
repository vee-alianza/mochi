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
    Category.belongsToMany(models.Story, {
      through: "storyCategories",
      foreignKey: "categoryId",
      otherKey: "storyId"
    })
  };
  return Category;
};
