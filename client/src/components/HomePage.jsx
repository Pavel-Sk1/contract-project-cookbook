import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import "./HomePage.css";

const mockRecipes = [
  {
    id: "1",
    title: "Вкусный Куриный Суп",
    img_url: "https://via.placeholder.com/300x200.png?text=Куриный+Суп",
    quantity_ingredient: 4,
    cooking_time: 69,
  },
  {
    id: "2",
    title: "Салат Цезарь",
    img_url: "https://via.placeholder.com/300x200.png?text=Салат+Цезарь",
    quantity_ingredient: 6,
    cooking_time: 1550,
  },
  {
    id: "3",
    title: "Паста Карбонара",
    img_url: "https://via.placeholder.com/300x200.png?text=Паста+Карбонара",
    quantity_ingredient: 1,
    cooking_time: 160,
  },
  {
    id: "4",
    title: "Борщ Украинский",
    img_url: "https://via.placeholder.com/300x200.png?text=Борщ",
    quantity_ingredient: 2,
    cooking_time: 90,
  },
  {
    id: "5",
    title: "Стейк из лосося",
    img_url: "https://via.placeholder.com/300x200.png?text=Лосось",
    quantity_ingredient: 3,
    cooking_time: 100,
  },
  {
    id: "6",
    title: "Овощное рагу",
    img_url: "https://via.placeholder.com/300x200.png?text=Рагу",
    quantity_ingredient: 11,
    cooking_time: 130,
  },
];

// Функция для имитации получения данных из API
const fetchRecipes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Перемешиваем рецепты для случайного порядка
      const shuffledRecipes = [...mockRecipes].sort(() => 0.5 - Math.random());
      resolve(shuffledRecipes);
    }, 500);
  });
};

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchRecipes()
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Не удалось загрузить рецепты.");
        setLoading(false);
      });
  }, []);

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
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
