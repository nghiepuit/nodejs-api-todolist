"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        productId: "randomID2",
        variantId: 2,
        variantValueId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        productId: "randomID2",
        variantId: 2,
        variantValueId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("productVariants", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("productVariants", null, {});
  }
};
