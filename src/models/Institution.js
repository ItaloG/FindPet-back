const { Model, DataTypes } = require("sequelize");

class Institution extends Model {
  static init(connection) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        descricao: DataTypes.STRING,
        url_foto_perfil: DataTypes.TEXT,
        url_foto_banner: DataTypes.TEXT,
        cnpj: DataTypes.STRING,
        type_institution_id: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.TelephoneInstitution);
    this.hasMany(models.AddressInstitution);
    this.hasMany(models.Support);
    this.belongsTo(models.TypeInstitution);
    this.hasMany(models.Campaigns);
    this.hasMany(models.Animal);
    this.hasMany(models.Employee);
  }
}

module.exports = Institution;