module.exports = {
  web: {
    port: process.env.PORT || 80
  },
  logging: {
    appenders: [{ type: "console", layout: { type: "basic" } }]
  },
  authSecret: "Nghiep2014!@#$%"
};
