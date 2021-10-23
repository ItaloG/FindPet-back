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


// for (let assoc of Object.kyes(Institution.associations)){
//     for (let accessor of Object.keys(Institution.associations[assoc].accessors)) {
//         console.log(Institution.name + '.' + Institution.associations[assoc].accessors[accessor] + '()');
//     }
// }