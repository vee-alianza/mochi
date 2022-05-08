'use strict';
const { faker } = require("@faker-js/faker");
const { User, Story } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seederData = [];
    const rating = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    const totalStory = await Story.count();
    const totalUser = await User.count();
    const totalLikes = faker.datatype.number({ min: 1, max: totalStory * totalUser });
    const uniqueKeys = new Set();
    for (let i = 0; i < totalLikes; i++) {
      let tempUserId = faker.datatype.number({ min: 1, max: totalUser });
      let tempStoryId = faker.datatype.number({ min: 1, max: totalStory });
      let key = `${tempUserId}-${tempStoryId}`;
      while (uniqueKeys.has(key)) {
        tempUserId = faker.datatype.number({ min: 1, max: totalUser });
        tempStoryId = faker.datatype.number({ min: 1, max: totalStory });
        key = `${tempUserId}-${tempStoryId}`;
      }
      uniqueKeys.add(key);
      seederData.push({
        storyId: tempStoryId,
        userId: tempUserId,
        rating: faker.helpers.uniqueArray(rating, 1)[0]
      });
    }
    return queryInterface.bulkInsert('storyLikes', seederData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('storyLikes', null, {});
  }
};
