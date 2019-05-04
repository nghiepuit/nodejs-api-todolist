"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("media", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("media", null, {});
  }
};
