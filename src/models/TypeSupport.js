const { Model, DataTypes } = require("sequelize");

class TypeSupport extends Model {
  static init(connection) {
    super.init(
      {
        tipo: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Support);
  }
}

module.exports = TypeSupport;
