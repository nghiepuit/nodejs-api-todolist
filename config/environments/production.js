module.exports = {
  web: {
    port: process.env.PORT || 3000
  },
  logging: {
    appenders: [{ type: "console", layout: { type: "basic" } }]
  },
  authSecret: "Nghiep2014!@#$%"
};
