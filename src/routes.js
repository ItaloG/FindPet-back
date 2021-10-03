const routes = require("express").Router();

const institutionController = require("./controllers/institution");
const userController = require("./controllers/user")

routes.get("/instituicoes", institutionController.index);
routes.post("/cadastro/instituicao", institutionController.store)

routes.post("/cadastro/usuario", userController.store);

module.exports = routes;
