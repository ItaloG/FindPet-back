const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Institution = require("../models/institution");
const TelephoneInstitution = require("../models/TelephoneInstitution");
const AddressInstitution = require("../models/AddressInsitution");
const Support = require("../models/Support");
const TypeInstitution = require("../models/TypeInstitution");
const Campaigns = require("../models/Campaigns");
// const Animal = require("../models/Animal");
const Cep = require("../models/Cep");
const TypeSupport = require("../models/TypeSupport");
// const TypeAnimal = require("../models/TypeAnimal");
// const SpecialCondition = require("../models/SpecialCondition");
const User = require("../models/User");
const TelephoneUser = require("../models/TelephoneUser");

const connection = new Sequelize(dbConfig.url, dbConfig.config);

Institution.init(connection);
Institution.associate(connection.models);

TelephoneInstitution.init(connection);
TelephoneInstitution.associate(connection.models);

AddressInstitution.init(connection);
AddressInstitution.associate(connection.models);

Support.init(connection);
Support.associate(connection.models);

TypeInstitution.init(connection);
TypeInstitution.associate(connection.models);

Campaigns.init(connection);
Campaigns.associate(connection.models);

// Animal.init(connection);
// Animal.associate(connection.models);

Cep.init(connection);
Cep.associate(connection.models);

TypeSupport.init(connection);
TypeSupport.associate(connection.models);

// TypeAnimal.init(connection);
// TypeAnimal.associate(connection.models);

// SpecialCondition.init(connection);
// SpecialCondition.associate(connection.models);

User.init(connection);
User.associate(connection.models);

TelephoneUser.init(connection);
TelephoneUser.associate(connection.models);

// for (let assoc of Object.kyes(Institution.associations)){
//     for (let accessor of Object.keys(Institution.associations[assoc].accessors)) {
//         console.log(Institution.name + '.' + Institution.associations[assoc].accessors[accessor] + '()');
//     }
// }