const { Model, DataTypes } = require("sequelize");

class Position extends Model {
    static init(connection) {
        super.init(
            {
                cargo: DataTypes.STRING,
            },
            {
                sequelize: connection,
            }
        );
    }
    static associate(models){
        this.hasMany(models.Employee);
    }
}

module.exports = Position