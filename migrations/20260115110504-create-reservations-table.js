"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reservations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      dateReservation: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },

      nombrePersonnes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      prixTotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      statut: {
        type: Sequelize.ENUM("Confirmée", "En attente", "Annulée"),
        allowNull: false,
        defaultValue: "En attente",
      },

      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Clients", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      voyageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Voyages", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reservations");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Reservations_statut";'
    );
  },
};
