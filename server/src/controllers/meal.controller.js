const axios = require("axios");

const API_KEY = process.env.THEMEALDB_API_KEY || "1";
const BASE_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}`;

const getRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    let meals = [];

    if (query) {
      const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
      meals = response.data.meals || [];
    } else {
      const response = await axios.get(`${BASE_URL}/search.php?f=a`);
      meals = response.data.meals || [];
    }

    const mappedRecipes = meals.map((meal) => ({
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      cooking_time: null,
      quantity_ingredient: null,
    }));

    res.json(mappedRecipes);
  } catch (error) {
    console.error("Error fetching meals from TheMealDB API:", error);
    res
      .status(500)
      .json({ message: "Error fetching meals from TheMealDB API" });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    const meal = response.data.meals ? response.data.meals[0] : null;

    if (!meal) {
      return res.status(404).json({ message: "Meal not found." });
    }

    // Извлекаем ингредиенты и инструкции
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(
          `${measure ? measure.trim() + " " : ""}${ingredient.trim()}`
        );
      }
    }

    const instructions = meal.strInstructions
      ? meal.strInstructions.split("\r\n").filter((step) => step.trim() !== "")
      : [];

    const mappedRecipe = {
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: instructions,
      ingredients: ingredients,
      youtube: meal.strYoutube, // Ссылка на Youtube
      source: meal.strSource, // Ссылка на источник
      cooking_time: null, // TheMealDB не предоставляет общее время приготовления напрямую
      quantity_ingredient: ingredients.length,
    };

    res.json(mappedRecipe);
  } catch (error) {
    console.error(`Error fetching meal ${id} from TheMealDB API:`, error);
    res
      .status(500)
      .json({ message: `Error fetching meal ${id} from TheMealDB API` });
  }
};

module.exports = { getRecipes, getRecipeById };
