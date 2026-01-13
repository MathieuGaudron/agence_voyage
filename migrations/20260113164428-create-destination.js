'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Destinations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      pays: {
        type: Sequelize.STRING
      },
      continent: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      climat: {
        type: Sequelize.STRING
      },
      meilleurePeriode: {
        type: Sequelize.STRING
      },
      langues: {
        type: Sequelize.STRING
      },
      monnaie: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Destinations');
  }
};