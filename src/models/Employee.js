const { Model, DataTypes } = require("sequelize");

class Employee extends Model {
    static init(connection) {
        super.init(
            {
                cpf: DataTypes.STRING,
                url_foto_perfil: DataTypes.TEXT,
                nome: DataTypes.STRING,
                dia_entrada: DataTypes.DATE,
                institution_id: DataTypes.INTEGER,
                cargo_id: DataTypes.INTEGER,
            },
            {
                sequelize: connection
            }
        );
    }
    static associate(models) {
        this.belongsTo(models.Position);
        this.belongsTo(models.Institution);
    }
}

module.exports = Employee;