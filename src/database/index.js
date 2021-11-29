const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Institution = require("../models/institution");
const TelephoneInstitution = require("../models/TelephoneInstitution");
const AddressInstitution = require("../models/AddressInsitution");
const Support = require("../models/Support");
const TypeInstitution = require("../models/TypeInstitution");
const Campaigns = require("../models/Campaigns");
const Animal = require("../models/Animal");
const Cep = require("../models/Cep");
const TypeSupport = require("../models/TypeSupport");
const TypeAnimal = require("../models/TypeAnimal");
const SpecialCondition = require("../models/SpecialCondition");
const User = require("../models/User");
const TelephoneUser = require("../models/TelephoneUser");
const Employee = require("../models/Employee");
const Position = require("../models/Position");
const Service = require("../models/Service");
const InstitutionService = require("../models/InstitutionService");
const AnimalSpecialCondition = require("../models/AnimalSpecialCondition");

const connection = new Sequelize(dbConfig.url, dbConfig.config);

Institution.init(connection);
TelephoneInstitution.init(connection);
AddressInstitution.init(connection);
Cep.init(connection);
User.init(connection);
TelephoneUser.init(connection);
TypeInstitution.init(connection);
Support.init(connection);
TypeSupport.init(connection);
Campaigns.init(connection);
Animal.init(connection);
TypeAnimal.init(connection);
SpecialCondition.init(connection);
Employee.init(connection);
Position.init(connection);
Service.init(connection);
InstitutionService.init(connection);
AnimalSpecialCondition.init(connection);

Institution.associate(connection.models);
TelephoneInstitution.associate(connection.models);
AddressInstitution.associate(connection.models);
Cep.associate(connection.models);
TelephoneUser.associate(connection.models);
User.associate(connection.models);
TypeInstitution.associate(connection.models);
Support.associate(connection.models);
TypeSupport.associate(connection.models);
Campaigns.associate(connection.models);
Animal.associate(connection.models);
TypeAnimal.associate(connection.models);
SpecialCondition.associate(connection.models);
Employee.associate(connection.models);
Position.associate(connection.models);
Service.associate(connection.models);

// for (let assoc of Object.keys(Service.associations)){
//     for (let accessor of Object.keys(Service.associations[assoc].accessors)) {
//         console.log(Service.name + '.' + Service.associations[assoc].accessors[accessor] + '()');
//     }
// }
