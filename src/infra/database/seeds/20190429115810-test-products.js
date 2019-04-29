"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: "randomID1",
        sku: "dt",
        name: "Điện Thoại",
        categoryId: 1,
        description: "abc",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "randomID2",
        sku: "mtb",
        name: "Máy Tính Bảng",
        categoryId: 1,
        description: "abc",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "randomID3",
        sku: "galaxy",
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
