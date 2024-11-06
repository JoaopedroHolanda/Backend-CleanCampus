'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ocorrencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ocorrencia.init({
    categoria_id: DataTypes.INTEGER,
    cliente_id: DataTypes.INTEGER,
    bloco: DataTypes.STRING,
    sala: DataTypes.STRING,
    descricao: DataTypes.STRING,
    severidade: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ocorrencia',
    tableName: 'ocorrencias'
  });
  return Ocorrencia;
};