"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        roleId: 2,
        permissionId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        roleId: 2,
        permissionId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        roleId: 3,
        permissionId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("rolePermissions", data, {});
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
