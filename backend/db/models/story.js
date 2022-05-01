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
    Story.belongsToMany(models.User, {
      through: "storyLikes",
      foreignKey: "storyId",
      otherKey: "userId"
    });
    Story.belongsToMany(models.User, {
      through: "bookmarks",
      foreignKey: "storyId",
      otherKey: "userId"
    });
    Story.belongsToMany(models.Categorgy, {
      through: "storyCategories",
      foreignKey: "storyId",
      otherKey: "categoryId"
    });
  };
  return Story;
};
