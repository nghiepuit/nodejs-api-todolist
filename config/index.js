require("dotenv").load();

const fs = require("fs");
const path = require("path");

const ENV = process.env.NODE_ENV || "development";

const envConfig = require(path.join(__dirname, "environments", ENV));
const dbConfig = loadDbConfig();

const PERMISSIONS = {
  MANAGE_USER: {
    id: 1,
    name: "MANAGE_USER"
  },
  MANAGE_PRODUCT: {
    id: 2,
    name: "MANAGE_PRODUCT"
  },
  MANAGE_CATEGORY: {
    id: 3,
    name: "MANAGE_CATEGORY"
  }
};
const SUPER_ADMIN_ROLE = 1;

const config = Object.assign(
  {
    [ENV]: true,
    env: ENV,
    db: dbConfig,
    permissions: PERMISSIONS,
    isSuperAdmin: SUPER_ADMIN_ROLE
  },
  envConfig
);

module.exports = config;

function loadDbConfig() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if (fs.existsSync(path.join(__dirname, "./database.js"))) {
    return require("./database")[ENV];
  }
}
