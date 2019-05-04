"use strict";

const sqlUp =
  "ALTER TABLE directories ADD CONSTRAINT FK_DIRECTORY_CHILDREN_TO_DIRECTORY_PARENT FOREIGN KEY (parent) REFERENCES directories(id) ON DELETE RESTRICT;";

const sqlDown = "ALTER TABLE directories DROP FOREIGN KEY FK_DIRECTORY_CHILDREN_TO_DIRECTORY_PARENT;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
