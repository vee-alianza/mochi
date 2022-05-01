'use strict';
const bcrypt = require('bcryptjs');
const { faker } = require("@faker-js/faker");


module.exports = {
  up: (queryInterface, Sequelize) => {
    const seederData = [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },

    ];
    for (let i = 0; i < 10; i++) {
      seederData.push({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        hashedPassword: bcrypt.hashSync('password4')
      });
    }
    return queryInterface.bulkInsert('Users', seederData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
