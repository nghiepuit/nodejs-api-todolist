module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db.development.sqlite",
    define: {
      charset: "utf8mb4",
      freezeTableName: true,
      underscored: true,
      underscoredAll: true,
      timestamps: false
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "mysql",
    define: {
      charset: "utf8mb4",
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
