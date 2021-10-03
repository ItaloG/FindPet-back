const { Model, DataTypes } = require("sequelize");

class TelephoneUser extends Model {
    static init(connection) {
        super.init(
            {
                numero: DataTypes.STRING,
            },
            {
                sequelize: connection,
            }
        );
    }
    static associate(models) {
        this.belongsTo(models.User);
    }
}

module.exports = TelephoneUser;