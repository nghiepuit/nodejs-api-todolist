"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        name: "MANAGE_USER",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "MANAGE_PRODUCT",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "MANAGE_CATEGORY",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("permissions", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("permissions", null, {});
  }
};
