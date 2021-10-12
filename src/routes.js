const routes = require("express").Router();

const institutionController = require("./controllers/institution");
const userController = require("./controllers/user");
const loginContoller = require("./controllers/Login");
const imagePerfilInstitutionController = require("./controllers/institutionImagePerfil");
const uploadSingleImage = require("./middlewares/uploadSingleImage");
const imageBannerInstitutionController = require("./controllers/institutionImageBanner");
const descriptionInstitutionController = require("./controllers/institutionDescription");

routes.get("/instituicoes", institutionController.index);
routes.post("/cadastro/instituicao", institutionController.store);
routes.post("/instituicoes/:id/perfil", uploadSingleImage, imagePerfilInstitutionController.store);
routes.post("/instituicoes/:id/banner", uploadSingleImage, imageBannerInstitutionController.store);
routes.post("/instituicoes/:id/descricao", descriptionInstitutionController.store);

routes.post("/login", loginContoller.store);
routes.post("/cadastro/usuario", userController.store);


module.exports = routes;
