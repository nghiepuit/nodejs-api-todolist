"use strict";

const sqlUp =
  "ALTER TABLE productMedia ADD CONSTRAINT FK_PRODUCT_MEDIA_TO_MEDIA FOREIGN KEY (mediaId) REFERENCES media(id);";
const sqlDown =
  "ALTER TABLE productMedia DROP FOREIGN KEY FK_PRODUCT_MEDIA_TO_MEDIA;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
