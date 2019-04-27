"use strict";

// const dataFaker = require('src/infra/support/dataFaker');
const { encryptPassword } = require("../../encryption");

module.exports = {
  up: function(queryInterface) {
    const data = [
      {
        id: 1,
        email: "nghiepuit" + "@gmail.com",
        password: encryptPassword("Password@123"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: "category" + "@gmail.com",
        password: encryptPassword("Password@123"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        email: "user" + "@gmail.com",
        password: encryptPassword("Password@123"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        email: "guest" + "@gmail.com",
        password: encryptPassword("Password@123"),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("users", data, {});
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete("users", null, {});
  }
};
