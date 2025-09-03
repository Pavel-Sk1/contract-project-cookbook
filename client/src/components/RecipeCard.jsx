import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // Импортируем иконку сердца
import "./RecipeCard.css";

function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false); // Состояние для отслеживания избранного

  const toggleFavorite = (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке при клике на сердечко
    e.stopPropagation(); // Останавливаем всплытие события
    setIsFavorite(!isFavorite);
    // Здесь должна быть логика добавления/удаления рецепта из избранного в глобальном состоянии или API
    console.log(
      `Рецепт ${recipe.title} ${
        isFavorite ? "удален из" : "добавлен в"
      } избранное`
    );
  };

  return (
    <Link to={`/recipes/${recipe.id}`} className="recipe-card-link">
      <div className="recipe-card-item">
        <img
          src={recipe.img_url}
          alt={recipe.title}
          className="recipe-card-image"
        />
        <button
          className={`favorite-button ${isFavorite ? "active" : ""}`}
          onClick={toggleFavorite}
          aria-label={
            isFavorite ? "Удалить из избранного" : "Добавить в избранное"
          }
        >
          <FaHeart />
        </button>

        <div className="recipe-card-info">
          <h3 className="recipe-card-title">{recipe.title}</h3>

          <div className="recipe-card-meta">
            {recipe.quantity_ingredient && (
              <span className="quantity-ingredient">
                {recipe.quantity_ingredient} Ингр.
              </span>
            )}
            {recipe.cooking_time && (
              <span className="cooking-time">{recipe.cooking_time} мин.</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
