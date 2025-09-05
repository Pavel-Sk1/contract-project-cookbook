import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css";
import axios from "axios";

import { RecipesService } from "../entities/recipes/RecipeService";

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRecipeByIdHandler = async (id) => {
    try {
      setLoading(true);
      const result = await RecipesService.getById(id);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.statusCode === 200) {
        setRecipe(result.data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipeByIdHandler(id);
  }, [id]); // Зависимость от ID, чтобы перезагружать при изменении маршрута

  if (loading) {
    return (
      <div className="recipe-page-container">
        <p>Загрузка рецепта...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recipe-page-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-page-container">
        <p>Рецепт не найден.</p>
      </div>
    );
  }

  return (
    <div className="recipe-page-container">
      <div className="recipe-card">
        <h2 className="recipe-title">{recipe.title}</h2>
        <img src={recipe.img_url} alt={recipe.name} className="recipe-image" />
        <h2 className="recipe-title">{recipe.name}</h2>
        <div className="recipe-section">
          <h3>Ингредиенты:</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="recipe-section">
          <h3>Инструкция по приготовлению:</h3>
          <ol className="instructions-list">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
        {recipe.youtube && (
          <div className="recipe-section">
            <h3>Видео-инструкция:</h3>
            <a href={recipe.youtube} target="_blank" rel="noopener noreferrer">
              Смотреть на YouTube
            </a>
          </div>
        )}
        {recipe.source && (
          <div className="recipe-section">
            <h3>Источник:</h3>
            <a href={recipe.source} target="_blank" rel="noopener noreferrer">
              Перейти к источнику
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipePage;
