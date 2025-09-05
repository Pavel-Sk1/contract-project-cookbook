import React, { useState, useEffect, useMemo } from "react";
import RecipeCard from "./RecipeCard";
import "./HomePage.css";
import axios from "axios";
import { RecipesService } from "../entities/recipes/RecipeService";


function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("random");

  const getAllRecipeHandler = async () => {
    try {
      setLoading(true);
      const result = await RecipesService.getAll()
      if (result.error) {
        setError(result.error)
      }
      if (result.statusCode === 200) {
        setRecipes(result.data)
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {   
    getAllRecipeHandler()    
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
