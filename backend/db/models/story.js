'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: {
      allowNull: false,
      type: DataTypes.STRING(100)
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
      type: DataTypes.STRING(10)
    },
    image: {
      type: DataTypes.STRING(255)
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Users" }
    },
  }, {});
  Story.associate = function (models) {
    Story.hasMany(models.Comment, { foreignKey: "storyId" });
    Story.hasMany(models.storyLike, { foreignKey: "storyId" });
    Story.hasMany(models.Bookmark, { foreignKey: "storyId" });
    Story.belongsTo(models.User, { foreignKey: "userId" });
    Story.belongsToMany(models.Category, {
      through: "storyCategories",
      foreignKey: "storyId",
      otherKey: "categoryId"
    });
  };
  return Story;
};
