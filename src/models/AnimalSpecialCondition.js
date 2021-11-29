const { Model, DataTypes } = require("sequelize");

class AnimalSpecialCondition extends Model {
    static init(connection) {
        super.init(
            {
                animal_id: DataTypes.INTEGER,
                special_condition_id: DataTypes.INTEGER
            },
            {
                sequelize: connection,
            }
        );
    }
}

module.exports = AnimalSpecialCondition;