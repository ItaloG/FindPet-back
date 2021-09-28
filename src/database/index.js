const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Institution = require("../models/institution");

const connection = new Sequelize(dbConfig.url, dbConfig.config);

Institution.init(connection);

module.exports = connection;
