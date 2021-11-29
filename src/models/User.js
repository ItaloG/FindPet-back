const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(connection) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        url_foto_perfil: DataTypes.TEXT,
        url_foto_banner: DataTypes.TEXT,
        cpf: DataTypes.STRING,
        logradouro: DataTypes.STRING,
        numero: DataTypes.INTEGER,
        complemento: DataTypes.STRING,
        cep_id: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.TelephoneUser);
    this.belongsTo(models.Cep);
  }
}

module.exports = User;
