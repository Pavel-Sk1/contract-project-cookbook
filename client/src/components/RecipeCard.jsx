import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="recipe-card-link">
      <div className="recipe-card-item">
        <img
          src={recipe.img_url}
          alt={recipe.title}
          className="recipe-card-image"
        />
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
