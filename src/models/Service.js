const { Model, DataTypes } = require("sequelize");

class Service extends Model {
    static init(sequelize) {
        super.init(
            {
                servico: DataTypes.STRING
            },
            {
                sequelize,
            }
        );
    }
    static associate(models) {
        this.belongsToMany(models.Institution, { through: "instituion_sevice" });
    }
}

module.exports = Service;