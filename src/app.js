const express = require("express");
require("dotenv").config();
const cors = require("cors");

const routes = require("./routes");

require("./database");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(routes);

module.exports = app;
