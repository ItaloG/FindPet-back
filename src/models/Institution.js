const { Model, DataTypes } = require("sequelize");

class Institution extends Model {
  static init(connection) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        cnpj: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.TypeInstitution);
    this.hasMany(models.TlephoneInstitution);
    this.hasMany(models.AddresInstitution);
  }
}
module.exports = Institution;
