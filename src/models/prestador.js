'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prestador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Prestador.init({
    email: DataTypes.STRING,
    ra: DataTypes.STRING,
    senha: DataTypes.STRING,
    tipo_servico: {
      type: DataTypes.ENUM('limpeza', 'manutencao_equipamentos', 'problemas_eletricos', 'climatizacao'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Prestador',
    tableName: 'prestadores'
  });  
  return Prestador;
};

