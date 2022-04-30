'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('storyCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      storyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Stories" }
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
    return queryInterface.dropTable('storyCategories');
  }
};
