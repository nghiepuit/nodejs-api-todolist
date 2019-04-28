"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "categories",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        parent: Sequelize.INTEGER,
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        slug: {
          type: Sequelize.STRING
        },
        isDeleted: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        status: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        image: Sequelize.STRING,
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
        }
      },
      {
        charset: "utf8",
        collate: "utf8mb4_unicode_ci"
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("categories");
  }
};
