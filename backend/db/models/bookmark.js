'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
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
  Bookmark.associate = function (models) {
    Bookmark.belongsTo(models.User, { foreignKey: "userId" });
    Bookmark.belongsTo(models.Story, { foreignKey: "storyId" });
  };
  return Bookmark;
};
