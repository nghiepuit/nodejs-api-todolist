module.exports = {
  development: {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      freezeTableName: true,
      underscored: true,
      underscoredAll: true,
      timestamps: false
    },
    username: "root",
    password: "Nghiep2014",
    database: "database_nodejs_dev"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "mysql",
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      freezeTableName: true,
      underscored: true,
      underscoredAll: true,
      timestamps: false
    },
    username: "root",
    password: "Nghiep2014",
    database: "database_nodejs"
  }
};
