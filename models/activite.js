"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Activite extends Model {
    static associate(models) {
      Activite.belongsTo(models.Destination, { foreignKey: "destinationId" });

      Activite.belongsToMany(models.Voyage, {
        through: models.VoyageActivite,
        foreignKey: "activiteId",
        otherKey: "voyageId",
      });

    }
  }

  Activite.init(
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dureeHeures: {
        type: DataTypes.DECIMAL(4, 1),
        allowNull: false,
        validate: { min: 0 },
      },
      prix: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
        validate: { min: 0 },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      niveauPhysique: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ageMinimum: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 0 },
      },
      destinationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Activite",
    }
  );

  return Activite;
};
