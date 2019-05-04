"use strict";

const sqlUp =
  "ALTER TABLE userRoles ADD CONSTRAINT FK_USER_ROLES_TO_ROLES FOREIGN KEY (roleId) REFERENCES roles(id);";
const sqlDown =
  "ALTER TABLE userRoles DROP FOREIGN KEY FK_USER_ROLES_TO_ROLES;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
