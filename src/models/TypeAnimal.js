const { Model, DataTypes } = require("sequelize");

class TypeAnimal extends Model {
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
    this.hasMany(models.Animal);
  }
}

module.exports = TypeAnimal;
