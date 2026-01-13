"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Voyage extends Model {
    static associate(models) {

    }
  }

  Voyage.init(
    {
      titre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dateDepart: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { isDate: true },
      },
      dateRetour: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { isDate: true },
      },
      dureeJours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 },
      },
      prixBase: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { min: 0 },
      },
      placesDisponibles: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
      },
      niveauDifficulte: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typeVoyage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      destinationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Voyage",
      validate: {
        dateRetourApresDepart() {
          if (this.dateDepart && this.dateRetour && this.dateRetour <= this.dateDepart) {
            throw new Error("dateRetour doit être après dateDepart");
          }
        },
      },
    }
  );

  return Voyage;
};
