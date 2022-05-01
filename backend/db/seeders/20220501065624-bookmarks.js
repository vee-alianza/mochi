'use strict';
const { faker } = require("@faker-js/faker");
const { User, Story } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seederData = [];
    const totalStory = await Story.count();
    const totalUser = await User.count();
    const totalBookmarks = faker.datatype.number({ min: 1, max: totalStory * totalUser });
    const uniqueKeys = new Set();
    for (let i = 0; i < totalBookmarks; i++) {
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
        userId: tempUserId
      });
    }
    return queryInterface.bulkInsert('Bookmarks', seederData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Bookmarks', null, {});
  }
};
