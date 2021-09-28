const { Model, DataTypes } = require("sequelize");

class Institution extends Model {
    static init(connection){
        super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                cpf: DataTypes.STRING,
                urlphoto: DataTypes.STRING 
            },
            {
                sequelize: connection,
            }
        );
    }
}
module.exports = Institution;