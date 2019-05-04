"use strict";

const sqlUp =
  "ALTER TABLE userRoles ADD CONSTRAINT FK_USER_ROLES_TO_USER FOREIGN KEY (userId) REFERENCES users(id);";
const sqlDown =
  "ALTER TABLE userRoles DROP FOREIGN KEY FK_USER_ROLES_TO_USER;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
