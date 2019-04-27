"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        userId: 1,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 2,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 2,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
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
