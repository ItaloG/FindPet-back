const { Model, DataTypes } = require("sequelize");

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        servico: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Institution, { through: "institution_services" });
  }
}

module.exports = Service;
