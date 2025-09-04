import React, { useState, useEffect, useMemo } from "react";
import RecipeCard from "./RecipeCard";
import "./HomePage.css";
import axios from "axios";

const fetchRecipes = async (query = "") => {
  try {
    const response = await axios.get(`/api/meals`, { params: { query } }); // Изменено на /api/meals
    return response.data.map((meal) => ({
      id: meal.id, // TheMealDB ID
      title: meal.title, // Название блюда
      img_url: meal.image, // Изображение
      cooking_time: meal.cooking_time, // Теперь может быть null, если не получено
      quantity_ingredient: meal.quantity_ingredient, // Теперь может быть null, если не получено
    }));
  } catch (error) {
    console.error("Error fetching recipes from API:", error);
    throw error;
  }
};

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("random");

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (err) {
        setError("Не удалось загрузить рецепты.");
      } finally {
        setLoading(false);
      }
    };
    loadRecipes();
  }, []);

  // Мемоизированный отсортированный список рецептов
  const sortedRecipes = useMemo(() => {
    let sorted = [...recipes];
    switch (selectedFilter) {
      case "cooking_time_desc":
        sorted.sort((a, b) => b.cooking_time - a.cooking_time);
        break;
      case "cooking_time_asc":
        sorted.sort((a, b) => a.cooking_time - b.cooking_time);
        break;
      case "ingredients_desc":
        sorted.sort((a, b) => b.quantity_ingredient - a.quantity_ingredient);
        break;
      case "ingredients_asc":
        sorted.sort((a, b) => a.quantity_ingredient - b.quantity_ingredient);
        break;
      case "random": // При каждом выборе 'random' пересортируем случайно
        sorted.sort(() => 0.5 - Math.random());
        break;
      default:
        break;
    }
    return sorted;
  }, [recipes, selectedFilter]);

  if (loading) {
    return (
      <div className="home-page-container">
        <p>Загрузка рецептов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="home-page-container">
      <h1 className="home-title">Популярные Рецепты</h1>

      <div className="filter-controls">
        <label htmlFor="sort-select">Сортировать:</label>
        <select
          id="sort-select"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="filter-select"
        >
          <option value="random">Случайный порядок</option>
          <option value="cooking_time_desc">
            По времени приготовления (убыв.)
          </option>
          <option value="cooking_time_asc">
            По времени приготовления (возр.)
          </option>
          <option value="ingredients_desc">
            По количеству ингредиентов (убыв.)
          </option>
          <option value="ingredients_asc">
            По количеству ингредиентов (возр.)
          </option>
        </select>
      </div>

      <div className="recipe-grid">
        {sortedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
