'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      recipe: {
        allowNull: false,
        type: Sequelize.TEXT(255)
      },
      ingredients: {
        allowNull: false,
        type: Sequelize.TEXT(255)
      },
      instructions: {
        allowNull: false,
        type: Sequelize.TEXT(255)
      },
      timeframe: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING(255)
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Stories');
  }
};
