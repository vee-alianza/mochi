'use strict';
module.exports = (sequelize, DataTypes) => {
  const commentLike = sequelize.define('commentLike', {
    commentId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Comments" }
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Users" }
    }
  }, {});
  commentLike.associate = function (models) {
    // associations can be defined here
  };
  return commentLike;
};
