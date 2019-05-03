"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        name: "Size",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Color",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("variants", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("variants", null, {});
  }
};
