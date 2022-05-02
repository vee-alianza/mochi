'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyLike = sequelize.define('storyLike', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Users" }

    },
    storyId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Stories" }

    }
  }, {});
  storyLike.associate = function (models) {
    storyLike.belongsTo(models.User, { foreignKey: "userId" });
    storyLike.belongsTo(models.Story, { foreignKey: "storyId" });
  };
  return storyLike;
};
