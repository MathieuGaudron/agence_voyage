"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VoyageActivite extends Model {
    static associate(models) {
      VoyageActivite.belongsTo(models.Voyage, { foreignKey: "voyageId" });
      VoyageActivite.belongsTo(models.Activite, { foreignKey: "activiteId" });
    }
  }

  VoyageActivite.init(
    {
      jour: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      ordre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      estInclus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      voyageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      activiteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "VoyageActivite",
      tableName: "VoyageActivites",
    }
  );

  return VoyageActivite;
};
