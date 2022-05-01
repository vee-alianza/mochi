'use strict';
const { faker } = require("@faker-js/faker");
const { User, Comment } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seederData = [];
    const totalComment = await Comment.count();
    const totalUser = await User.count();
    const totalLikes = faker.datatype.number({ min: 1, max: totalComment * totalUser });
    const uniqueKeys = new Set();
    for (let i = 0; i < totalLikes; i++) {
      let tempUserId = faker.datatype.number({ min: 1, max: totalUser });
      let tempCommentId = faker.datatype.number({ min: 1, max: totalComment });
      let key = `${tempUserId}-${tempCommentId}`;
      while (uniqueKeys.has(key)) {
        tempUserId = faker.datatype.number({ min: 1, max: totalUser });
        tempCommentId = faker.datatype.number({ min: 1, max: totalComment });
        key = `${tempUserId}-${tempCommentId}`;
      }
      uniqueKeys.add(key);
      seederData.push({
        commentId: tempCommentId,
        userId: tempUserId
      });
    }
    return queryInterface.bulkInsert('commentLikes', seederData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('commentLikes', null, {});
  }
};
