"use strict";

const sqlUp =
  "ALTER TABLE productVariants ADD CONSTRAINT FK_PRODUCT_VARIANT_TO_VARIANT_VALUE FOREIGN KEY (variantValueId) REFERENCES variantValues(id);";
const sqlDown =
  "ALTER TABLE productVariants DROP FOREIGN KEY FK_PRODUCT_VARIANT_TO_VARIANT_VALUE;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
