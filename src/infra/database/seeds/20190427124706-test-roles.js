"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        name: "Super Admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Editor",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "HR",
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
