const { Model, DataTypes } = require("sequelize");

class InstitutionService extends Model {
  static init(connetion) {
    super.init(
      {
        institution_id: DataTypes.INTEGER,
        service_id: DataTypes.INTEGER,
      },
      {
        sequelize: connetion,
      }
    );
  }
}

module.exports = InstitutionService;
