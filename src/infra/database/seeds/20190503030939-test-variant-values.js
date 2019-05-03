"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        variantId: 1,
        value: "M",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        variantId: 1,
        value: "L",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        variantId: 1,
        value: "XL",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        variantId: 1,
        value: "XXL",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        variantId: 2,
        value: "Xanh",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        variantId: 2,
        value: "Đỏ",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("variantValues", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("variantValues", null, {});
  }
};
