import React, { useEffect, useState } from "react";
import "./FavoritesPage.css";
import { FavoriteService } from "../entities/favorites/FavoriteService";

// const mockRecipes = [
//   {
//     id: 1,
//     title: "Вкусный Куриный Суп",
//     img_url: "https://via.placeholder.com/150x100.png?text=Куриный+Суп",
//     cookingTime: 45, // минуты
//     ingredientsCount: 7,
//   },
//   {
//     id: 2,
//     title: "Салат Цезарь",
//     img_url: "https://via.placeholder.com/150x100.png?text=Салат+Цезарь",
//     cookingTime: 20,
//     ingredientsCount: 6,
//   },
//   {
//     id: 3,
//     title: "Паста Карбонара",
//     img_url: "https://via.placeholder.com/150x100.png?text=Паста+Карбонара",
//     cookingTime: 30,
//     ingredientsCount: 5,
//   },
// ];

function FavoritesPage({user}) {
  const [recipes, setRecipes] = useState([]);
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

  const getFavoriteRecipes = async () => {
    try {
      console.log(user, '<><><><')
      
      const result = await FavoriteService.getByUserId(user.id)
      console.log(result.data, "sdfgkhsfiuadhf");
       
      setRecipes(result.data)

      console.log(recipes, "12343536")
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      getFavoriteRecipes()
    }    
  },[user])

  return (
    <div className="favorites-page-container">
      <div className="favorites-content">
        <h2 className="favorites-title">Избранные Рецепты</h2>

        {/* <div className="sort-options">
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
        </div> */}

        <div className="recipe-list">
          {recipes?.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe['Recipe.id']} className="recipe-item-card">
                <img
                  src={recipe['Recipe.img_url']}
                  alt={recipe['Recipe.title']}
                  className="recipe-item-image"
                />
                <h3 className="recipe-item-title">{recipe['Recipe.title']}</h3>
                <p>Время приготовления: {recipe['Recipe.cooking_time']} мин.</p>
                <p>Ингредиентов: {recipe['Recipe.quantity_ingredient']}</p>
                {}
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
