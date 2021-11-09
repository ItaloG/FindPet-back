const { Model, DataTypes } = require("sequelize");

class Campaigns extends Model {
  static init(connection) {
    super.init(
      {
        numero: DataTypes.INTEGER,
        logradouro: DataTypes.STRING,
        complemento: DataTypes.STRING,
        url_foto: DataTypes.TEXT,
        cidade: DataTypes.TEXT,
        titulo: DataTypes.STRING,
        descricao: DataTypes.STRING,
        data_inicio: DataTypes.DATE,
        data_fim: DataTypes.DATE,
        hora_inicio: DataTypes.TIME,
        hora_fim: DataTypes.TIME,
        cep_id: DataTypes.INTEGER,
        institution_id: DataTypes.INTEGER,
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

module.exports = Campaigns;
