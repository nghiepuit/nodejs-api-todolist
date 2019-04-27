'use strict';

// const dataFaker = require('src/infra/support/dataFaker');
const { encryptPassword } = require('../../encryption');

module.exports = {
  up: function(queryInterface) {
    const testUsers = [];

    testUsers.push({
      email: 'nghiepuit' + '@gmail.com',
      password: encryptPassword('123456')
    });

    return queryInterface.bulkInsert('users', testUsers, {});
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
