"use strict";

const sqlUp =
  "ALTER TABLE products ADD CONSTRAINT FK_PRODUCT_TO_CATEGORY FOREIGN KEY (categoryId) REFERENCES categories(id);";
const sqlDown =
  "ALTER TABLE products DROP FOREIGN KEY FK_PRODUCT_TO_CATEGORY;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
