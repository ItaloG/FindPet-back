const routes = require("express").Router();

const institutionController = require("./controllers/institution");

routes.get("/instituicoes", institutionController.index);

routes.post("/cadastro/instituicao", institutionController.store)

module.exports = routes;
