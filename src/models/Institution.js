const { Model, DataTypes } = require("sequelize");

class Institution extends Model {
  static init(connection) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        cpf: DataTypes.STRING,
        urlFoto: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Telephone);
  }
}
module.exports = Institution;
