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
    return queryInterface.bulkDelete('Categories', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
