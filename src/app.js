const express = require("express");
require("./database");
require("dotenv").config();
const routes = require("./routes");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());


app.use(routes);

module.exports = app;
