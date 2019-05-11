"use strict";
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const directoryPath = path.resolve("uploads");
    try {
      fs.readdir(directoryPath, function(err, files) {
        //handling error
        if (err) {
          return console.log("Unable to scan directory: " + err);
        }
        //listing all files using forEach
        files.forEach(function(file) {
          // Do whatever you want to do with the file
          const removedFolder = path.resolve("uploads") + "/" + file;
          rimraf(removedFolder, function() {
            console.log("Delete: ", removedFolder + " done!");
          });
        });
      });
    } catch (err) {
      console.log("Error while delete folder: ", err);
    }
    return queryInterface.createTable(
      "directories",
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
        path: {
          type: Sequelize.STRING,
          unique: true
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
        parent: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null
        }
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci"
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("directories");
  }
};
