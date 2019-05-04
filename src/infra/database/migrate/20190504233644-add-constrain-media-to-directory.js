"use strict";

const sqlUp =
  "ALTER TABLE media ADD CONSTRAINT FK_MEDIA_TO_DIRECTORY FOREIGN KEY (directoryId) REFERENCES directories(id) ON DELETE RESTRICT;";

const sqlDown = "ALTER TABLE media DROP FOREIGN KEY FK_MEDIA_TO_DIRECTORY;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
