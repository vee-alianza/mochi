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
    // associations can be defined here
  };
  return Bookmark;
};
