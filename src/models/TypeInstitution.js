const { Model, DataTypes } = require("sequelize");

class TypeInstitution extends Model {
    static init(connection) {
        super.init(
            {
                type_institution: DataTypes.STRING,
            },
            {
                sequelize: connection,
            }
        );
    }
    static associate(models) {
        this.hasMany(models.Institution);
    }
}

module.exports = TypeInstitution;