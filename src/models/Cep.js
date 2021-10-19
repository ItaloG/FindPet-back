const { Model, DataTypes } = require("sequelize");


class Cep extends Model {
    static init(connection) {
        super.init(
            {
                cep: DataTypes.STRING,
            },
            {
                sequelize: connection,
            }
        );
    }
    static associate(models) {
        this.hasMany(models.AddressInstitution);
        this.hasMany(models.User);
        this.hasMany(models.Campaigns);
    }
}

module.exports = Cep;