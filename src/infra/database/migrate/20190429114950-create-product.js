"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "products",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        slug: {
          type: Sequelize.STRING
        },
        status: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        description: {
          type: Sequelize.STRING
        },
        hot: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        sale: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        new: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
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
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci"
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("products");
  }
};
