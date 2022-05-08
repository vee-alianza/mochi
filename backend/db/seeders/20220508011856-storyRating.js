'use strict';
const { Story, storyLike } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allStories = await Story.findAll({ include: [{ model: storyLike, attributes: ['rating'] }] });

    allStories.forEach(async (story) => {
      if (story.storyLikes.length) {
        const parsedRatings = story.storyLikes.map((rateObj) => Number(rateObj.rating));
        const ratingSum = parsedRatings.reduce((prev, current) => prev + current);

        story.rating = (ratingSum / parsedRatings.length).toFixed(2);
        await story.save();
      }
    });
  },

  down: async (queryInterface, Sequelize) => { }
};
