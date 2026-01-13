"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Hebergement extends Model {
    static associate(models) {
      // Hebergement.belongsTo(models.Destination, { foreignKey: "destinationId" });
    }
  }

  Hebergement.init(
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      categorie: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      adresse: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nombreEtoiles: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 0, max: 5 },
      },
      equipements: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      prixNuit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { min: 0 },
      },
      destinationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Hebergement",
    }
  );

  return Hebergement;
};
