'use strict';
const { faker } = require("@faker-js/faker");
const { User, Category } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seederData = [];
    const totalUser = await User.count();
    const totalCategory = await Category.count();
    for (let i = 0; i < 10; i++) {
      seederData.push({
        title: faker.lorem.words(5),
        timeframe: faker.lorem.word(3),
        recipe: faker.lorem.paragraphs(1, '<br/>\n'),
        ingredients: faker.lorem.paragraphs(2, '<br/>\n'),
        instructions: faker.lorem.paragraphs(2, '<br/>\n'),
        image: faker.image.food(150, 150, true),
        userId: faker.datatype.number({ min: 1, max: totalUser }),
        categoryId: faker.datatype.number({ min: 1, max: totalCategory })
      });
    }
    return queryInterface.bulkInsert('Stories', seederData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Stories', null, {});
  }
};
