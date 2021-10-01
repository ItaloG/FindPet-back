const { Model, DataTypes } = require("sequelize");

class Address extends Model {
  static init(connection) {
    super.init(
      {
        rua: DataTypes.STRING,
        cpf: DataTypes.STRING,
        numero: DataTypes.INTEGER,
        complemento: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate
}
