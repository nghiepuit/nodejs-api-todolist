"use strict";

const sqlUp =
  "ALTER TABLE rolePermissions ADD CONSTRAINT FK_ROLE_PERMISSIONS_TO_PERMISSION FOREIGN KEY (permissionId) REFERENCES permissions(id);";
const sqlDown =
  "ALTER TABLE rolePermissions DROP FOREIGN KEY FK_ROLE_PERMISSIONS_TO_PERMISSION;";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlUp);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(sqlDown);
  }
};
