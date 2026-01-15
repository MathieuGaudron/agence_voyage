"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.belongsTo(models.Client, { foreignKey: "clientId" });
      Reservation.belongsTo(models.Voyage, { foreignKey: "voyageId" });
    }
  }

  Reservation.init(
    {
      dateReservation: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nombrePersonnes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      prixTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      statut: {
        type: DataTypes.ENUM("Confirmée", "En attente", "Annulée"),
        allowNull: false,
        defaultValue: "En attente",
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      voyageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Reservation",
      tableName: "Reservations",
    }
  );

  return Reservation;
};
