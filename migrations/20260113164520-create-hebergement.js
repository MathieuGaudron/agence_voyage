'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hebergements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      categorie: {
        type: Sequelize.STRING
      },
      adresse: {
        type: Sequelize.STRING
      },
      nombreEtoiles: {
        type: Sequelize.INTEGER
      },
      equipements: {
        type: Sequelize.TEXT
      },
      prixNuit: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Hebergements');
  }
};