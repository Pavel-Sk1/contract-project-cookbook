"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: "userId" });
      Favorite.belongsTo(models.Recipe, { foreignKey: "recipeId" });
    }
  }
  Favorite.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      recipeId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );
  return Favorite;
};
