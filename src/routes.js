const routes = require("express").Router();

const uploadSingleImage = require("./middlewares/uploadSingleImage");
const uploadFirebase = require("./services/uploadFirebase");
const authUser = require("./middlewares/authUser");
const authInstitution = require("./middlewares/authInstitution");

const institutionController = require("./controllers/institution");
const userController = require("./controllers/user");
const loginContoller = require("./controllers/Login");
const imagePerfilInstitutionController = require("./controllers/institutionImagePerfil");
const imageBannerInstitutionController = require("./controllers/institutionImageBanner");
const descriptionInstitutionController = require("./controllers/institutionDescription");
const supportController = require("./controllers/support");
const typeInstitution = require("./controllers/typeInstitution");
const campaignsController = require("./controllers/campaigns");

//rotas publicas
routes.post("/login", loginContoller.store);
routes.post("/cadastro/usuario", userController.store);
routes.post("/cadastro/instituicao", institutionController.store);
routes.get("/tipoInstituicoes", typeInstitution.index);

//rotas privadas
routes.use(authUser);
routes.get("/instituicoes", institutionController.index);

routes.use(authInstitution);
routes.get("/instituicoes", institutionController.index);
routes.get("/instituicoes/:id", institutionController.find);
routes.get("/apoios", supportController.index);
routes.get("/apoios/:id", supportController.find);
routes.get("/campanhas", campaignsController.index);
routes.get("/campanhas/:id", campaignsController.find);

routes.post("/apoios/:id", supportController.store);
routes.post("/instituicoes/:id/perfil", uploadSingleImage, uploadFirebase, imagePerfilInstitutionController.store);
routes.post("/instituicoes/:id/banner", uploadSingleImage, uploadFirebase, imageBannerInstitutionController.store);
routes.post("/instituicoes/:id/descricao", descriptionInstitutionController.store);
routes.post("/campanhas", uploadSingleImage, uploadFirebase, campaignsController.store);

module.exports = routes;
