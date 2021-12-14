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
const animalController = require("./controllers/animal");
const employeeController = require("./controllers/employee");
const servicesController = require("./controllers/service");
const institutionServicesController = require("./controllers/institutionService");
const positionController = require("./controllers/position");
const typeAnimalController = require("./controllers/typeAnimal");
const specialConditionController = require("./controllers/specialCondition");
const userBannerController = require("./controllers/userBanner");
const userPerfilrController = require("./controllers/userPerfil");
const cordenadasConstroller = require("./controllers/cordenadas");

//rotas publicas
routes.post("/login", loginContoller.store);
routes.post("/cadastro/usuario", userController.store);
routes.post("/cadastro/instituicao", institutionController.store);
routes.get("/tipoInstituicoes", typeInstitution.index);

//rotas privadas
routes.use(authUser);

routes.get("/cordenadas", cordenadasConstroller.index);

routes.get("/usuarios/:id", userController.find);

routes.get("/apoios", supportController.index);
routes.get("/apoios/:id", supportController.find);

routes.get("/instituicoes", institutionController.index);
routes.get("/instituicoes/:id", institutionController.find);
routes.get("/instituicoes/:id/servicos", institutionServicesController.find);

routes.get("/instituicao/:id/campanhas/", campaignsController.index);
routes.get("/instituicao/campanhas/:id", campaignsController.find);
routes.get("/instituicao/:id/animais", animalController.index);
routes.get("/instituicao/animais/:id", animalController.find);
routes.get("/instituicao/:id/funcionarios", employeeController.index);


routes.put("/usuarios/:id", userController.update);

routes.put(
  "/usuarios/:id/banner",
  uploadSingleImage,
  uploadFirebase,
  userBannerController.update
);

routes.put(
  "/usuarios/:id/perfil",
  uploadSingleImage,
  uploadFirebase,
  userPerfilrController.update
);

routes.use(authInstitution);

routes.get("/instituicoes", institutionController.index);
routes.get("/instituicoes/:id", institutionController.find);
routes.get("/instituicoes/:id/servicos", institutionServicesController.find);

routes.get("/instituicao/:id/campanhas/", campaignsController.index);
routes.get("/instituicao/campanhas/:id", campaignsController.find);
routes.get("/instituicao/:id/animais", animalController.index);
routes.get("/instituicao/animais/:id", animalController.find);

routes.get("/instituicao/:id/funcionarios", employeeController.index);

routes.get("/apoios", supportController.index);
routes.get("/apoios/:id", supportController.find);
routes.get("/campanhas", campaignsController.index);
routes.get("/campanhas/:id", campaignsController.find);
routes.get("/animais", animalController.index);
routes.get("/animais/:id", animalController.find);
routes.get("/tiposAnimal", typeAnimalController.index);
routes.get("/condicoesEspeciais", specialConditionController.index);
routes.get("/funcionarios", employeeController.index);
routes.get("/funcionarios/:id", employeeController.find);
routes.get("/servicos", servicesController.index);
routes.get("/cargos", positionController.index);

routes.post("/apoios/:id", supportController.store);

routes.post(
  "/campanhas",
  uploadSingleImage,
  uploadFirebase,
  campaignsController.store
);
routes.post(
  "/animais",
  uploadSingleImage,
  uploadFirebase,
  animalController.store
);
routes.post(
  "/funcionarios",
  uploadSingleImage,
  uploadFirebase,
  employeeController.store
);
routes.post("/servicos", institutionServicesController.store);

routes.put(
  "/instituicoes/:id/banner",
  uploadSingleImage,
  uploadFirebase,
  imageBannerInstitutionController.update
);

routes.put(
  "/instituicoes/:id/perfil",
  uploadSingleImage,
  uploadFirebase,
  imagePerfilInstitutionController.update
);

routes.put(
  "/instituicoes/:id/descricao",
  descriptionInstitutionController.update
);
routes.put(
  "/funcionarios/:id",
  uploadSingleImage,
  uploadFirebase,
  employeeController.update
);
routes.put(
  "/campanhas/:id",
  uploadSingleImage,
  uploadFirebase,
  campaignsController.update
);
routes.put(
  "/animais/:id",
  uploadSingleImage,
  uploadFirebase,
  animalController.update
);

routes.delete("/funcionarios/:id", employeeController.delete);
routes.delete("/campanhas/:id", campaignsController.delete);
routes.delete("/animais/:id", animalController.delete);
routes.delete("/servicos/:id", institutionServicesController.delete);

module.exports = routes;
