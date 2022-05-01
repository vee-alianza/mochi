'use strict';
const { faker } = require("@faker-js/faker");
const { User } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seederData = [];
    const totalUser = await User.count();
    const totalFollowers = faker.datatype.number({ min: 1, max: (totalUser * totalUser) - totalUser });
    const uniqueKeys = new Set();
    for (let i = 0; i < totalFollowers; i++) {
      let tempUserId = faker.datatype.number({ min: 1, max: totalUser });
      let tempFollowerId = faker.datatype.number({ min: 1, max: totalUser });
      let key = `${tempUserId}-${tempFollowerId}`;
      while (uniqueKeys.has(key) || tempUserId === tempFollowerId) {
        tempUserId = faker.datatype.number({ min: 1, max: totalUser });
        tempFollowerId = faker.datatype.number({ min: 1, max: totalUser });
        key = `${tempUserId}-${tempFollowerId}`;
      }
      uniqueKeys.add(key);
      seederData.push({
        followerId: tempFollowerId,
        userId: tempUserId
      });
    }
    return queryInterface.bulkInsert('Follows', seederData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Follows', null, {});
  }
};
