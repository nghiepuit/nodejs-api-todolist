"use strict";

const sqlUp =
  "ALTER TABLE productVariants ADD CONSTRAINT FK_PRODUCT_VARIANT_TO_VARIANT FOREIGN KEY (variantId) REFERENCES variants(id);";
const sqlDown =
  "ALTER TABLE productVariants DROP FOREIGN KEY FK_PRODUCT_VARIANT_TO_VARIANT;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
