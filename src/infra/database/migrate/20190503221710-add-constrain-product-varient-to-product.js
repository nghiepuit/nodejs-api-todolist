"use strict";

const sqlUp =
  "ALTER TABLE productvariants ADD CONSTRAINT FK_PRODUCT_VARIANT_TO_PRODUCT FOREIGN KEY (productId) REFERENCES products(id);";

const sqlDown =
  "ALTER TABLE productvariants DROP FOREIGN KEY FK_PRODUCT_VARIANT_TO_PRODUCT;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
