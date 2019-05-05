"use strict";

const sqlUp =
  "ALTER TABLE media ADD CONSTRAINT FK_UNIQUE_COMBINATION_MEDIA_IN_DIRECTORY UNIQUE(name, path, directoryId)";

const sqlDown =
  "ALTER TABLE media DROP INDEX FK_UNIQUE_COMBINATION_MEDIA_IN_DIRECTORY;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
