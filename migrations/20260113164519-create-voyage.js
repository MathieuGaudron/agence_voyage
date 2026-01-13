'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Voyages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      dateDepart: {
        type: Sequelize.DATE
      },
      dateRetour: {
        type: Sequelize.DATE
      },
      dureeJours: {
        type: Sequelize.INTEGER
      },
      prixBase: {
        type: Sequelize.DECIMAL
      },
      placesDisponibles: {
        type: Sequelize.INTEGER
      },
      niveauDifficulte: {
        type: Sequelize.STRING
      },
      typeVoyage: {
        type: Sequelize.STRING
      },
      destinationId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Voyages');
  }
};