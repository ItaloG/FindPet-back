const { Model, DataTypes } = require("sequelize");

class TypeSpecialCondition extends Model {
    static init(connection) {
        super.init(
            {
                condicao: DataTypes.STRING,
            },
            {
                sequelize: connection,
            }
        );
    }
    static associate(models) {
        this.belongsToMany(models.Animal, { through: "animal_special_conditions"})
    }
}

module.exports = TypeSpecialCondition;