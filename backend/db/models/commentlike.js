'use strict';
module.exports = (sequelize, DataTypes) => {
  const commentLike = sequelize.define('commentLike', {
    commentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  commentLike.associate = function(models) {
    // associations can be defined here
  };
  return commentLike;
};