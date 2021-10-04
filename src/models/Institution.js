const { Model, DataTypes } = require("sequelize");

class Institution extends Model {
  static init(connection) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        type_institution_id: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.TelephoneInstitution);
    this.hasMany(models.AddressInstitution);
    this.belongsTo(models.TypeInstitution);
  }
}
module.exports = Institution;
