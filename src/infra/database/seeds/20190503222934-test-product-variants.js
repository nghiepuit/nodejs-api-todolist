"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        productId: "randomID2",
        variantId: 2,
        variantValueId: 5,
        price: 120.000,
        promotionPrice: 100.000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        productId: "randomID2",
        variantId: 2,
        variantValueId: 6,
        price: 50.000,
        promotionPrice: 100.000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("productvariants", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("productvariants", null, {});
  }
};
