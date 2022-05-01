'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const seederData = [{
      title: "Africa"
    },
    {
      title: "Asia"
    },
    {
      title: "Australia/Oceania"
    },
    {
      title: "Europe"
    },
    {
      title: "North America"
    },
    {
      title: "South America"
    },
    ];

    return queryInterface.bulkInsert('Categories', seederData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
