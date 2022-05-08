'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    recipe: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    ingredients: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    instructions: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    timeframe: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    rating: {
      type: DataTypes.STRING(4)
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Users" }
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Categories" }
    },
  }, {});
  Story.associate = function (models) {
    Story.hasMany(models.Comment, { foreignKey: "storyId", onDelete: "cascade", hooks: true });
    Story.hasMany(models.storyLike, { foreignKey: "storyId", onDelete: "cascade", hooks: true });
    Story.hasMany(models.Bookmark, { foreignKey: "storyId", onDelete: "cascade", hooks: true });
    Story.belongsTo(models.User, { foreignKey: "userId" });
    Story.belongsTo(models.Category, { foreignKey: "categoryId" });
  };
  return Story;
};
