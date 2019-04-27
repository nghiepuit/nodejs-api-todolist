'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        userId: 1,
        roleId: 1
      },
      {
        id: 2,
        userId: 1,
        roleId: 2
      },
      {
        id: 3,
        userId: 2,
        roleId: 1
      }
    ];
    return queryInterface.bulkInsert("userRoles", data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
