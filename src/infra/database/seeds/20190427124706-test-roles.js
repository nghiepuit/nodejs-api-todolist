"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        name: "Manage Category",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Manage User",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("roles", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  }
};
