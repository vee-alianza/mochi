'use strict';
const { faker } = require("@faker-js/faker");
const { User, Story } = require("../models");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seederData = [];
    const totalUser = await User.count();
    const totalStory = await Story.count();
    for (let i = 0; i < 40; i++) {
      seederData.push({
        storyId: faker.datatype.number({ min: 1, max: totalStory }),
        content: faker.lorem.sentences(2, '\n'),
        userId: faker.datatype.number({ min: 1, max: totalUser })
      });
    }
    return queryInterface.bulkInsert('Comments', seederData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
