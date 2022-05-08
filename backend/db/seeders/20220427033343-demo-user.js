'use strict';
const bcrypt = require('bcryptjs');
const { faker } = require("@faker-js/faker");


module.exports = {
  up: (queryInterface, Sequelize) => {
    const seederData = [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        about: faker.lorem.sentences(2, '\n'),
        profileImage: faker.image.people(200, 200, true)
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        about: faker.lorem.sentences(3, '\n'),
        profileImage: faker.image.people(200, 200, true)
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        about: faker.lorem.sentences(1, '\n'),
        profileImage: faker.image.people(200, 200, true)
      },

    ];
    for (let i = 0; i < 15; i++) {
      seederData.push({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        hashedPassword: bcrypt.hashSync('password4'),
        about: faker.lorem.sentences(3, '\n'),
        profileImage: faker.image.people(200, 200, true)
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
