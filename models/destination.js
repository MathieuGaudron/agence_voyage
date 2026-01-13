"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    static associate(models) {

    }
  }

  Destination.init(
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      pays: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      climat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      meilleurePeriode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      langues: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      monnaie: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Destination",
    }
  );

  return Destination;
};
