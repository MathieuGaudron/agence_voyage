'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Activites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      dureeHeures: {
        type: Sequelize.DECIMAL
      },
      prix: {
        type: Sequelize.DECIMAL
      },
      type: {
        type: Sequelize.STRING
      },
      niveauPhysique: {
        type: Sequelize.STRING
      },
      ageMinimum: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Activites');
  }
};