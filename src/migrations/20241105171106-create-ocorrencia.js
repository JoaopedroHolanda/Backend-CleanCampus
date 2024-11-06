'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ocorrencias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoria_id: {
        type: Sequelize.INTEGER
      },
      cliente_id: {
        type: Sequelize.INTEGER
      },
      bloco: {
        type: Sequelize.STRING
      },
      sala: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      severidade: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('ocorrencias');
  }
};