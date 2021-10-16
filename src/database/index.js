const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const AddressInstitution = require("../models/AddressInsitution");
const Cep = require("../models/Cep");
const Institution = require("../models/institution");
const Support = require("../models/Support");
const TelephoneInstitution = require("../models/TelephoneInstitution");
const TelephoneUser = require("../models/TelephoneUser");
const TypeInstitution = require("../models/TypeInstitution");
const TypeSupport = require("../models/TypeSupport");
const User = require("../models/User");

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

Institution.associate(connection.models);
TelephoneInstitution.associate(connection.models);
AddressInstitution.associate(connection.models);
Cep.associate(connection.models);
TelephoneUser.associate(connection.models);
User.associate(connection.models);
TypeInstitution.associate(connection.models);
Support.associate(connection.models);
TypeSupport.associate(connection.models);

// for (let assoc of Object.kyes(Category.associations)){
//     for (let accessor of Object.keys(Category.associations[assoc].accessors)) {
//         console.log(Category.name + '.' + Category.associations[assoc].accessors[accessor] + '()');
//     }
// }