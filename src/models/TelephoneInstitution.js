const { Model, DataTypes } = require("sequelize");

class TelephoneInstitution extends Model {
  static init(connection) {
    super.init(
      {
        numero: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Institution);
  }
}

module.exports = TelephoneInstitution;
