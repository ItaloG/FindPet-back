const express = require("express");
require("./database");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

module.exports = app;