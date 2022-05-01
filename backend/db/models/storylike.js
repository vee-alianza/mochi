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
    // associations can be defined here
  };
  return storyLike;
};
