import React, { useState } from "react";
import "./FavoritesPage.css";

const mockRecipes = [
  {
    id: 1,
    title: "Вкусный Куриный Суп",
    img_url: "https://via.placeholder.com/150x100.png?text=Куриный+Суп",
    cookingTime: 45, // минуты
    ingredientsCount: 7,
  },
  {
    id: 2,
    title: "Салат Цезарь",
    img_url: "https://via.placeholder.com/150x100.png?text=Салат+Цезарь",
    cookingTime: 20,
    ingredientsCount: 6,
  },
  {
    id: 3,
    title: "Паста Карбонара",
    img_url: "https://via.placeholder.com/150x100.png?text=Паста+Карбонара",
    cookingTime: 30,
    ingredientsCount: 5,
  },
];

function FavoritesPage() {
  const [recipes, setRecipes] = useState(mockRecipes);
  const [sortBy, setSortBy] = useState("none");

  const sortRecipes = (criteria) => {
    let sorted = [...recipes];
    if (criteria === "time") {
      sorted.sort((a, b) => a.cookingTime - b.cookingTime);
    } else if (criteria === "ingredients") {
      sorted.sort((a, b) => a.ingredientsCount - b.ingredientsCount);
    }
    setRecipes(sorted);
    setSortBy(criteria);
  };

  return (
    <div className="favorites-page-container">
      <div className="favorites-content">
        <h2 className="favorites-title">Избранные Рецепты</h2>

        <div className="sort-options">
          <span>Сортировать по: </span>
          <button
            className={`sort-button ${sortBy === "time" ? "active" : ""}`}
            onClick={() => sortRecipes("time")}
          >
            Времени приготовления
          </button>
          <button
            className={`sort-button ${
              sortBy === "ingredients" ? "active" : ""
            }`}
            onClick={() => sortRecipes("ingredients")}
          >
            Количеству ингредиентов
          </button>
        </div>

        <div className="recipe-list">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-item-card">
                <img
                  src={recipe.img_url}
                  alt={recipe.title}
                  className="recipe-item-image"
                />
                <h3 className="recipe-item-title">{recipe.title}</h3>
                <p>Время приготовления: {recipe.cookingTime} мин.</p>
                <p>Ингредиентов: {recipe.ingredientsCount}</p>
                {/* Здесь можно добавить кнопку "Перейти к рецепту" */}
              </div>
            ))
          ) : (
            <p>У вас пока нет избранных рецептов.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage;
