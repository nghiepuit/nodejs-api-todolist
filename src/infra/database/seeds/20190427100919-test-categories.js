"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        name: "Thiết bị điện tử",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Phụ kiện điện tử",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "TV & Thiết bị gia dụng",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "Sức khỏe & làm đẹp",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: "Mẹ & bé",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: "Siệu thị tạp hóa",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: "Hàng gia dụng",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        name: "Điện thoại di động",
        parent: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        name: "Máy tính bảng",
        parent: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        name: "Laptop",
        parent: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("categories", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  }
};
