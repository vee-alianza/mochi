'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    allowNull: false,
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Users" }
    },
    followerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Follows" }

    }
  }, {});
  Follow.associate = function (models) {
    // associations can be defined here
  };
  return Follow;
};
