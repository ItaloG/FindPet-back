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
            },
            {
                sequelize: connection,
            }
        );
    }
    static associate(models) {
        this.belongsTo(models.TypeAnimal);
        this.belongsToMany(models.TypeSpecialCondition, { through: "animal_special_conditions" });
        this.belongsToMany(models.Institution, { through: "institution_animals" });
    }
}

module.exports = Animal;