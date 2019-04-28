module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db.development.sqlite"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "mysql",
    define: {
      underscored: false
    },
    username: "root",
    password: "Nghiep2014",
    database: "database_nodejs"
  }
};
