import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css";
import { RecipesService } from "../entities/recipes/RecipeService";

// const mockFullRecipes = [
//   {
//     id: "1",
//     title: "Вкусный Куриный Суп",
//     img_url: "https://via.placeholder.com/600x400.png?text=Куриный+Суп",
//     ingredients: [
//       "1 кг курицы",
//       "2 л воды",
//       "2 моркови",
//       "3 картофелины",
//       "1 луковица",
//       "Соль, перец по вкусу",
//       "Зелень для подачи",
//     ],
//     instructions: [
//       "1. Курицу промыть, залить холодной водой и довести до кипения. Снять пену.",
//       "2. Добавить целую луковицу и морковь, варить на медленном огне 40-60 минут.",
//       "3. Курицу вынуть, отделить мясо от костей, нарезать. Бульон процедить.",
//       "4. Картофель и морковь нарезать кубиками. Добавить в бульон, варить 15 минут.",
//       "5. Добавить нарезанное куриное мясо, посолить, поперчить. Варить еще 5 минут.",
//       "6. Подавать, посыпав свежей зеленью.",
//     ],
//   },
//   {
//     id: "2",
//     title: "Салат Цезарь",
//     img_url: "https://via.placeholder.com/600x400.png?text=Салат+Цезарь",
//     ingredients: [
//       "1 кочан салата Романо",
//       "200 г куриного филе",
//       "50 г пармезана",
//       "Гренки",
//       "Соус Цезарь",
//     ],
//     instructions: [
//       "1. Куриное филе отварить или обжарить, нарезать.",
//       "2. Салат порвать руками, выложить на тарелку.",
//       "3. Добавить нарезанное филе, тертый пармезан, гренки.",
//       "4. Заправить соусом Цезарь.",
//     ],
//   },
//   {
//     id: "3",
//     title: "Паста Карбонара",
//     img_url: "https://via.placeholder.com/600x400.png?text=Паста+Карбонара",
//     ingredients: [
//       "200 г спагетти",
//       "100 г бекона",
//       "2 яйца",
//       "50 г пармезана",
//       "Черный перец",
//     ],
//     instructions: [
//       "1. Отварить спагетти до состояния аль денте.",
//       "2. Бекон нарезать и обжарить до хрустящей корочки.",
//       "3. Взбить яйца с тертым пармезаном и перцем.",
//       "4. Слить воду со спагетти, добавить бекон, затем яичную смесь, быстро перемешать.",
//     ],
//   },
// ];

// // Функция для имитации получения данных одного рецепта по ID из API
// const fetchRecipeById = (id) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const recipe = mockFullRecipes.find((r) => r.id === id);
//       resolve(recipe);
//     }, 300);
//   });
// };



function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const getRecipeByIdHandler = async (id) => {
  try {
    setLoading(true);
    const result = await RecipesService.getById(id)

    if(result.error) {
      setError(result.error);
        return;
    }

    if (result.statusCode === 200) {
      setRecipe(result.data)
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    // fetchRecipeById(id)
    //   .then((data) => {
    //     if (data) {
    //       setRecipe(data);
    //     } else {
    //       setError("Рецепт не найден.");
    //     }
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setError("Не удалось загрузить рецепт.");
    //     setLoading(false);
    //   });
    getRecipeByIdHandler(id)    
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
        <img src={recipe.image} alt={recipe.name} className="recipe-image" />
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
      </div>
    </div>
  );
}

export default RecipePage;
