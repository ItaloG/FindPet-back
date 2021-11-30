require("dotenv").config();

module.exports = {
  url: process.env.DATABASE_URL_AWS,
  config: {
    dialect: "mysql",
    define: {
      timestamp: true,
      underscored: true,
    },
  },
};
