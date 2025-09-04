import React, { useState, useEffect, useMemo } from "react";
import RecipeCard from "./RecipeCard";
import "./HomePage.css";
import { RecipesService } from "../entities/recipes/RecipeService";

const mockRecipes = [
  {
    id: "1",
    title: "Вкусный Куриный Суп",
    img_url: "https://art-lunch.ru/content/uploads/2014/02/chicken-soup-001.jpg",
    quantity_ingredient: 4,
    cooking_time: 60, // Время в минутах
  },
  {
    id: "2",
    title: "Салат Цезарь",
    img_url: "https://via.placeholder.com/300x200.png?text=Салат+Цезарь",
    quantity_ingredient: 6,
    cooking_time: 20,
  },
  {
    id: "3",
    title: "Паста Карбонара",
    img_url: "https://via.placeholder.com/300x200.png?text=Паста+Карбонара",
    quantity_ingredient: 7,
    cooking_time: 30,
  },
  {
    id: "4",
    title: "Борщ Украинский",
    img_url: "https://via.placeholder.com/300x200.png?text=Борщ",
    quantity_ingredient: 10,
    cooking_time: 90,
  },
  {
    id: "5",
    title: "Стейк из лосося",
    img_url: "https://via.placeholder.com/300x200.png?text=Лосось",
    quantity_ingredient: 3,
    cooking_time: 25,
  },
  {
    id: "6",
    title: "Овощное рагу",
    img_url: "https://via.placeholder.com/300x200.png?text=Рагу",
    quantity_ingredient: 8,
    cooking_time: 45,
  },
];

// Функция для имитации получения данных из API
const fetchRecipes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Перемешиваем рецепты для случайного порядка при первоначальной загрузке
      const shuffledRecipes = [...mockRecipes].sort(() => 0.5 - Math.random());
      resolve(shuffledRecipes);
    }, 500);
  });
};

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("random"); // Состояние для выбранного фильтра

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
    // const loadRecipes = async () => {
    //   setLoading(true);
    //   try {
    //     const data = await fetchRecipes();
    //     setRecipes(data);
    //   } catch (err) {
    //     setError("Не удалось загрузить рецепты.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // loadRecipes();
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
