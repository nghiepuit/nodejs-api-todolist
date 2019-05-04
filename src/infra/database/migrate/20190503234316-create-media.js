"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "media",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        originalFilename: {
          type: Sequelize.STRING
        },
        src: {
          type: Sequelize.STRING
        },
        path: {
          type: Sequelize.STRING
        },
        size: {
          type: Sequelize.STRING
        },
        type: {
          type: Sequelize.STRING
        },
        extension: {
          type: Sequelize.STRING
        },
        directoryId: {
          type: Sequelize.INTEGER
        },
        createdBy: {
          type: Sequelize.UUID
        },
        updatedBy: {
          type: Sequelize.UUID
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci"
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("media");
  }
};
