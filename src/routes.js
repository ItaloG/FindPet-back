const routes = require("express").Router();

const uploadSingleImage = require("./middlewares/uploadSingleImage");
const authUser =  require("./middlewares/authUser");
const authInstitution = require("./middlewares/authInstitution");

const institutionController = require("./controllers/institution");
const userController = require("./controllers/user");
const loginContoller = require("./controllers/Login");
const imagePerfilInstitutionController = require("./controllers/institutionImagePerfil");
const imageBannerInstitutionController = require("./controllers/institutionImageBanner");
const descriptionInstitutionController = require("./controllers/institutionDescription");

//rotas publicas
routes.post("/login", loginContoller.store);
routes.post("/cadastro/usuario", userController.store);
routes.post("/cadastro/instituicao", institutionController.store);

//rotas privadas
routes.use(authUser);
routes.get("/instituicoes", institutionController.index);


routes.use(authInstitution);

routes.get("/instituicoes", institutionController.index);
routes.post("/instituicoes/:id/perfil", uploadSingleImage, imagePerfilInstitutionController.store);
routes.post("/instituicoes/:id/banner", uploadSingleImage, imageBannerInstitutionController.store);
routes.post("/instituicoes/:id/descricao", descriptionInstitutionController.store);



module.exports = routes;
