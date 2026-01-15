"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VoyageActivites", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      jour: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      ordre: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      estInclus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      voyageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Voyages", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      activiteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Activites", key: "id" },
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

 
    await queryInterface.addConstraint("VoyageActivites", {
      fields: ["voyageId", "activiteId"],
      type: "unique",
      name: "uniq_voyage_activite",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("VoyageActivites");
  },
};
