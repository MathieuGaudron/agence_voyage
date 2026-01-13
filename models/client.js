"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {

    }
  }

  Client.init(
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true, notEmpty: true },
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateNaissance: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      ville: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pays: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      preferences: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Client",
    }
  );

  return Client;
};
