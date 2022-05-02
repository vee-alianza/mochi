'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    storyId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Stories" }
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT(255)
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Users" }
    }
  }, {});
  Comment.associate = function (models) {
    Comment.belongsTo(models.Story, { foreignKey: "storyId" });
    Comment.belongsTo(models.User, { foreignKey: "userId" });
    Comment.hasMany(models.commentLike, { foreignKey: "commentId", onDelete: "cascade", hooks: true });
  };
  return Comment;
};
