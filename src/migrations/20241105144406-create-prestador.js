'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prestadores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      ra: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      },
      tipo_servico: {
        type: Sequelize.ENUM('limpeza', 'manutencao_equipamentos', 'problemas_eletricos', 'climatizacao'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('prestadores');
  }
};

