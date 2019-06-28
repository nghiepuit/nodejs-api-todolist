"use strict";

const sqlUp =
  "ALTER TABLE productMedia ADD CONSTRAINT FK_PRODUCT_MEDIA_TO_PRODUCT_VARIANT FOREIGN KEY (productVariantId) REFERENCES productvariants(id);";
const sqlDown =
  "ALTER TABLE productMedia DROP FOREIGN KEY FK_PRODUCT_MEDIA_TO_PRODUCT_VARIANT;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
