import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css";
import axios from "axios";

const fetchRecipeById = async (id) => {
  try {
    const response = await axios.get(`/api/meals/${id}`); // Изменено на /api/meals/${id}
    const data = response.data;
    return {
      id: data.idMeal, // TheMealDB ID
      title: data.strMeal, // Название блюда
      img_url: data.strMealThumb, // Изображение
      ingredients: data.ingredients, // Массив ингредиентов уже подготовлен на сервере
      instructions: data.instructions, // Массив инструкций уже подготовлен на сервере
      cooking_time: data.cooking_time, // Время приготовления (может быть null)
      youtube: data.youtube, // Ссылка на Youtube
      source: data.source, // Ссылка на источник
    };
  } catch (error) {
    console.error(`Error fetching recipe ${id} from API:`, error);
    throw error;
  }
};

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("RecipePage - ID from URL:", id); // Логирование ID

  useEffect(() => {
    setLoading(true);
    fetchRecipeById(id)
      .then((data) => {
        console.log("RecipePage - Fetched data:", data); // Логирование полученных данных
        if (data) {
          setRecipe(data);
        } else {
          setError("Рецепт не найден.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Не удалось загрузить рецепт.");
        setLoading(false);
      });
  }, [id]);

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
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <h2 className="recipe-title">{recipe.title}</h2>
        {recipe.category && <p>Категория: {recipe.category}</p>}
        {recipe.area && <p>Регион: {recipe.area}</p>}


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
