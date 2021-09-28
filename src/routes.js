const routes = require("express").Router();

const institutionController = require("./controllers/institution");

routes.get("/institutions", institutionController.index);

module.exports = routes;
