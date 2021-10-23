const { Model, DataTypes } = require("sequelize");

class Animal extends Model {
    static init(connection) {
        super.init(
            {
                url_foto_perfil: DataTypes.TEXT,
                nome: DataTypes.STRING,
                personalidade: DataTypes.STRING,
                idade: DataTypes.INTEGER,
                castrado: DataTypes.BOOLEAN,
                historia: DataTypes.STRING,
                type_animal_id: DataTypes.INTEGER,
                institution_id: DataTypes.INTEGER,
            },
            {
                sequelize: connection,
            }
        );
    }
    static associate(models) {
        this.belongsTo(models.TypeAnimal);
        this.belongsToMany(models.SpecialCondition, { through: "animal_special_conditions" });
        this.belongsTo(models.Institution);
    }
}

module.exports = Animal;