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
        type: Sequelize.STRING
      },
      recipe: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      ingredients: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      instructions: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      timeframe: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING(255)
      },
      rating: {
        type: Sequelize.STRING(4),
        defaultValue: "0"
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" }
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Categories" }
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
