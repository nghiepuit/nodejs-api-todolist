"use strict";

const sqlUp =
  "ALTER TABLE rolePermissions ADD CONSTRAINT FK_ROLE_PERMISSIONS_TO_ROLES FOREIGN KEY (roleId) REFERENCES roles(id);";
const sqlDown =
  "ALTER TABLE rolePermissions DROP FOREIGN KEY FK_ROLE_PERMISSIONS_TO_ROLES;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
