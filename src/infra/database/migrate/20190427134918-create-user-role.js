"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "userRoles",
      {
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true
        },
        roleId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        charset: "utf8",
        collate: "utf8mb4_unicode_ci"
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("userRoles");
  }
};
