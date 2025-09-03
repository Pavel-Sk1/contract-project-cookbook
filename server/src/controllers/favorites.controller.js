const { where } = require("sequelize");
const { Favorite, User, Recipe } = require("../db/models");
const formatResponse = require("../utils/formatResponse");

module.exports = {
  async list(req, res) {
    try {
      const favorites = await Favorite.findAll({
        order: [['createdAt', 'DESC']],
      });
      return res
        .status(200)
        .json(formatResponse(200, 'Избранные рецепты успешно получены', favorites, null));

    } catch (err) {
      return res
        .status(500)
        .json(formatResponse(500, "Не удалось получить избранные рецепты", null, err.message));
    }
  },

  async listByUser(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res
          .status(400)
          .json(formatResponse(400, 'Не передан userId', null));
      }

      const favorites = await Favorite.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
      });
      return res
        .status(200)
        .json(formatResponse(200, 'Избранное пользователя получено', favorites, null));
    } catch (err) {
      return res
        .status(500)
        .json(formatResponse(500, 'Ошибка при получении избранного пользователя', null, err.message));
    }
  },

  async add(req, res) {
    try {
      const { userId, recipeId } = req.body; 
      
      if (!userId || !recipeId) {
        return res
          .status(400)
          .json(formatResponse(400, 'userId и recipeId обязательны', null));
      }
      
      const favorite = await Favorite.create({ userId, recipeId });
      return res
        .status(201)
        .json(formatResponse(201, 'Рецепт добавлен в избранное', favorite, null));
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res
          .status(409)
          .json(formatResponse(409, 'Этот рецепт уже в избранном у пользователя', null, err.message));
      }
      return res
        .status(500)
        .json(formatResponse(500, 'Не удалось добавить в избранное', null, err.message));
    }
  },

  async remove(req, res) { // Исправлено: было removeEventListener
    try {
      const { userId, recipeId } = req.body; // Исправлено: было req.borderStyle
      
      if (!userId || !recipeId) {
        return res
          .status(400)
          .json(formatResponse(400, 'userId и recipeId обязательны', null));
      }

      const deleted = await Favorite.destroy({ where: { userId, recipeId } }); // Исправлено: было delete (зарезервированное слово)

      if (!deleted) {
        return res
          .status(404)
          .json(formatResponse(404, 'Такой записи в избранном не найдено', null));
      }

      return res
        .status(200)
        .json(formatResponse(200, 'Рецепт удалён из избранного', { userId, recipeId }, null));

    } catch (err) {
      return res
        .status(500)
        .json(formatResponse(500, 'Не удалось удалить из избранного', null, err.message));
    }
  },

  async check(req, res) {
    try {
      const { userId, recipeId } = req.query;

      if (!userId || !recipeId) {
        return res
          .status(400)
          .json(formatResponse(400, 'userId и recipeId обязательны', null));
      }

      const exists = await Favorite.findOne({ where: { userId, recipeId } });

      return res
        .status(200)
        .json(formatResponse(200, 'Проверка выполнена', { isFavorite: !!exists }, null));
    } catch (err) {
      return res
        .status(500)
        .json(formatResponse(500, 'Ошибка при проверке избранного', null, err.message));
    }
  }
};