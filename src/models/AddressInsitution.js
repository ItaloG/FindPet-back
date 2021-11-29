const { Model, DataTypes } = require("sequelize");

class AddressInstitution extends Model {
  static init(connection) {
    super.init(
      {
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
    this.belongsTo(models.Institution);
    this.belongsTo(models.Cep);
  }
}

module.exports = AddressInstitution;
