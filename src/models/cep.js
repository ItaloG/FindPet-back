const { Model, DataTypes } = require("sequelize");

class Cep extends Model {
  static init(connection) {
    super.init(
      {
        cep: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate
}
