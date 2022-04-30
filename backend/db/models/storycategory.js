'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyCategory = sequelize.define('storyCategory', {
    storyId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Stories" }
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Categories" }
    }
  }, {});
  storyCategory.associate = function (models) {
    storyCategory.belongsTo(models.Story, { foreignKey: "storyId" })
    storyCategory.hasMany(models.Category, { foreignKey: "categoryId" })

  };
  return storyCategory;
};
