const RecipeService = require("../services/Recipe.service");
const isValidId = require("../utils/isValidId");
const formatResponse = require("../utils/formatResponse");
const { Recipe: RecipeValidator } = require("../db/models");

class RecipeController {
  static async getAll(req, res) {
    try {
      //! если !isAuth ===>> 401
      //! если isAuth && isNotAdmin ===>> 403
      const recipes = await RecipeService.getAll();

      //!-----
      if (!recipes) {
        return res
          .status(500)
          .json(formatResponse(500, "не удалось получить данные по рецептам"));
      }

      //!-----
      if (recipes.length === 0) {
        return res
          .status(200)
          .json(formatResponse(204, "нет данных по рецептам", []));
      }

      return res
        .status(200)
        .json(formatResponse(200, "успешно получены данные", recipes));
    } catch ({ message }) {
      console.error("======RecipeController.getAll===\n", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутреннаяя ошибка сервера", null, message));
    }
    //! errorHandler
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      if (!isValidId(id)) {
        return res
          .status(429)
          .json(
            formatResponse(
              429,
              "не удалось получить рецепт",
              null,
              "не валидный id"
            )
          );
      }

      const recipe = await RecipeService.getById(id);

      if (!recipe) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "не удалось получить рецепт",
              null,
              `рецепт с id ${id} не найден`
            )
          );
      }

      return res
        .status(200)
        .json(
          formatResponse(200, "успешно получены данные по рецепту", recipe)
        );
    } catch ({ message }) {
      console.error("======RecipeController.getById===\n", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутреннаяя ошибка сервера", null, message));
    }
    //! errorHandler
  }

  static async create(req, res) {
    try {
      const {
        title,
        instructions,
        ingredients,
        cooking_time,
        quantity_ingredient,
        img_url,
      } = req.body;

      const { isValid, error } = RecipeValidator.validate({
        title,
        instructions,
        ingredients,
        cooking_time,
        quantity_ingredient,
        img_url,
      });

      if (!isValid) {
        return res.status(429).json(formatResponse(429, error, null, error));
      }

      const newRecipe = await RecipeService.create({
        title,
        instructions,
        ingredients,
        cooking_time,
        quantity_ingredient,
        img_url,
      });

      if (!newRecipe)
        return res
          .status(500)
          .json(
            formatResponse(
              500,
              "не удалось создать рецепт",
              null,
              "не удалось создать рецепт"
            )
          );

      return res
        .status(201)
        .json(formatResponse(201, "успешно создан рецепт", newRecipe));
    } catch ({ message }) {
      console.error("======RecipeController.create===\n", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутреннаяя ошибка сервера", null, message));
    }
    //! errorHandler
  }

  static async updateById(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        instructions,
        ingredients,
        cooking_time,
        quantity_ingredient,
        img_url,
      } = req.body; 

      if (!isValidId(id)) {
        return res
          .status(429)
          .json(
            formatResponse(
              429,
              "не удалось изменить рецепт",
              null,
              "не валидный id"
            )
          );
      }

      const { isValid, error } = RecipeValidator.validate({
        title,
        instructions,
        ingredients,
        cooking_time,
        quantity_ingredient,
        img_url,
      });

      if (!isValid) {
        return res.status(429).json(formatResponse(429, error, null, error));
      }

      const updatedRecipe = await RecipeService.updateById(+id, {
        title,
        instructions,
        ingredients,
        cooking_time,
        quantity_ingredient,
        img_url,
      });

      if (!updatedRecipe) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "не удалось получить или изменить рецепт",
              null,
              `рецепт с id ${id} не найден или не был изменен`
            )
          );
      }

      return res
        .status(200)
        .json(formatResponse(200, "задача успешно обновлена", updatedRecipe));
    } catch ({ message }) {
      console.error("======TaskController.updateById===\n", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутреннаяя ошибка сервера", null, message));
    }
    //! errorHandler
  }

  static async deleteById(req, res) {
    try {
      const { id } = req.params;

      if (!isValidId(id)) {
        return res
          .status(429)
          .json(
            formatResponse(
              429,
              "не удалось удалить рецепт",
              null,
              "не валидный id"
            )
          );
      }

      const deletedRecipe = await RecipeService.deleteById(+id);

      if (!deletedRecipe) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "не удалось получить или удалить рецепт",
              null,
              `рецепт с id ${id} не найден или не был удален`
            )
          );
      }

      res.status(200).json(formatResponse(200, `рецепт успешно удален`));
    } catch ({ message }) {
      console.error("======RecipeController.deleteById===\n", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутреннаяя ошибка сервера", null, message));
    }
    //! errorHandler
  }
}

module.exports = RecipeController;
