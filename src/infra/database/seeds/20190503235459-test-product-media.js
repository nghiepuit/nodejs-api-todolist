"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        productVariantId: 1,
        mediaId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        productVariantId: 1,
        mediaId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        productVariantId: 1,
        mediaId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("productmedia", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("productmedia", null, {});
  }
};
