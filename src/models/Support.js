const { Model, DataTypes } = require("sequelize");

class Support extends Model {
  static init(connection) {
    super.init(
      {
        valor: DataTypes.FLOAT,
        idade_minima: DataTypes.INTEGER,
        horario: DataTypes.STRING,
        urgencia: DataTypes.BOOLEAN,
        descricao: DataTypes.STRING,
        type_support_id: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.TypeSupport);
    this.belongsTo(models.Institution);
  }
}

module.exports = Support;
