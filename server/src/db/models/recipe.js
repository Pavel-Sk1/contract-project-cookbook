"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate({ User, Favorite }) {
      this.belongsToMany(User, {
        through: Favorite, 
        as: 'FavoritedByUsers',       
        foreignKey: "recipeId", 
      });
    }

    static validate({
      title,
      instructions,
      ingredients,
      cooking_time,
      quantity_ingredient,
      img_url,
    }) {
      if (!title || typeof title !== "string" || title.trim().length === 0) {
        return {
          isValid: false,
          error: "Название рецепта не должно быть не пустой строкой",
        };
      }

      if (!instructions || typeof instructions !== "string" || instructions.trim().length === 0) {
        return {
          isValid: false,
          error: "Инструкции к рецепту должны быть не пустой строкой",
        };
      }

      if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return {
          isValid: false,
          error: "Ингредиенты рецепта должны быть не пустой строкой",
        };
      }

      if (
        !cooking_time ||
        typeof cooking_time !== "number" ||
        cooking_time <= 0
      ) {
        return {
          isValid: false,
          error: "Время приготовленния должно быть больше нуля",
        };
      }

      if (
        !quantity_ingredient ||
        typeof quantity_ingredient !== "number" ||
        quantity_ingredient <= 0
      ) {
        return {
          isValid: false,
          error: "Количество ингредиентов должно быть больше нуля",
        };
      }

      if (
        !img_url ||
        typeof img_url !== "string" ||
        img_url.trim().length === 0
      ) {
        return {
          isValid: false,
          error: "Ссылка на изображение не должна быть пустой строкой",
        };
      }

      if (!img_url.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
        return {
          isValid: false,
          error:
            "Изображение должно быть с расширением jpg, jpeg, png, webp или gif",
        };
      }
      
      return {
        isValid: true,
        error: null,
      };
    }
  }
  Recipe.init(
    {
      title: DataTypes.STRING,
      instructions: DataTypes.TEXT,
      ingredients: DataTypes.JSONB,
      cooking_time: DataTypes.INTEGER,
      quantity_ingredient: DataTypes.INTEGER,
      img_url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Recipe",
    }
  );
  return Recipe;
};
