"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: "randomID1",
        name: "Áo thun nam",
        categoryId: 1,
        description: "abc",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "randomID2",
        name: "Máy Tính Bảng",
        categoryId: 1,
        description: "abc",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "randomID3",
        name: "Galaxy",
        categoryId: 11,
        description: "test",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("products", data, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products", null, {});
  }
};
