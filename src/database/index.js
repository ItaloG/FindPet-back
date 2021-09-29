const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Institution = require("../models/institution");
const Telephone = require("../models/Telephone");

const connection = new Sequelize(dbConfig.url, dbConfig.config);

Institution.init(connection);
Telephone.init(connection);

Institution.associate(connection.models);
Telephone.associate(connection.models);


// for (let assoc of Object.kyes(Category.associations)){
//     for (let accessor of Object.keys(Category.associations[assoc].accessors)) {
//         console.log(Category.name + '.' + Category.associations[assoc].accessors[accessor] + '()');
//     }
// }
module.exports = connection;