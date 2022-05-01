'use strict';
const { faker } = require("@faker-js/faker");
const { Story, Category } = require('../models');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seederData = [];
    const totalCategory = await Category.count();
    const totalStory = await Story.count();
    for (let i = 0; i < 10; i++) {
      seederData.push({
        storyId: faker.datatype.number({ min: 1, max: totalStory }),
        categoryId: faker.datatype.number({ min: 1, max: totalCategory })
      });
    }
    return queryInterface.bulkInsert('storyCategories', seederData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('storyCategories', null, {});
  }
};
