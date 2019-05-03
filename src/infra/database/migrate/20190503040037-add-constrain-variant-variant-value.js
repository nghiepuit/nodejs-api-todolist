"use strict";

const sqlUp =
  "ALTER TABLE variantValues ADD CONSTRAINT FK_VARIANT_VALUE_TO_VARIANT FOREIGN KEY (variantId) REFERENCES variants(id);";
const sqlDown =
  "ALTER TABLE variantValues DROP FOREIGN KEY FK_VARIANT_VALUE_TO_VARIANT;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
