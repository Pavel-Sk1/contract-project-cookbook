const FavoriteService = require('../services/Favorite.service');
const isValidId = require('../utils/isValidId');
const formatResponse = require('../utils/formatResponse');


class FavoriteController {
  static async getAll(req, res) {
    try {
      const favorites = await FavoriteService.getAll();

      if (!favorites) {
        return res
          .status(500)
          .json(formatResponse(500, 'не удалось получить избранное'));
      }

      if (favorites.length === 0) {
        return res
          .status(200)
          .json(formatResponse(204, 'избранное отсутствует', []));
      }

      return res
        .status(200)
        .json(formatResponse(200, 'успешно получены данные', favorites));
    } catch ({ message }) {
      console.error('======FavoriteController.getAll===\r\n', message)
      return res
        .status(500)
        .json(formatResponse(500, 'внутренняя ошибка сервера', null, message));
    }
  }

  static async getByUser(req, res) {
    try {
      const { userId } = req.params;
    console.log(userId, "<<<<<<<<<userId");
    
      if (!isValidId(userId)) {
        return res
          .status(429)
          .json(formatResponse(429, 'невалидный userId', null, 'invalid id'));
      }

      const favorites = await FavoriteService.getByUser(+userId);
      
     console.log(favorites, "!!!!!!!");
     
      return res
        .status(200)
        .json(formatResponse(200, 'успешно получены данные', favorites));
    } catch ({ message }) {
      console.error('======FavoriteController.getByUser===\r\n', message);
      return res
        .status(500)
        .json(formatResponse(500, 'внутренняя ошибка сервера', null, message));
    }
  }

  
  static async create(req, res) {
    try {
      const { user } = res.locals || {};
      const { userId: bodyUserId, recipeId } = req.body;

      const userId = user?.id ?? bodyUserId;

      if (!isValidId(userId) || !isValidId(recipeId)) {
        return res
          .status(429)
          .json(formatResponse(429, 'userId и recipeId должны быть положительными числами', null, 'invalid ids'));
      }

      

      const favorite = await FavoriteService.add(+userId, +recipeId);
      if (!favorite) {
        return res
          .status(500)
          .json(formatResponse(500, 'не удалось добавить в избранное'));
      }

      return res
        .status(201)
        .json(formatResponse(201, 'рецепт добавлен в избранное', favorite));
    } catch ({ message, name }) {
      if (name === 'SequelizeUniqueConstraintError') {
        return res
          .status(409)
          .json(formatResponse(409, 'этот рецепт уже в избранном у пользователя', null, message));
      }
      console.error('======FavoriteController.create===\r\n', message)
      return res
        .status(500)
        .json(formatResponse(500, 'внутренняя ошибка сервера', null, message));
    }
  }

  
  static async delete(req, res) {
    try {
      const { userId, recipeId } = req.params; 
      if (!isValidId(userId) || !isValidId(recipeId)) {
        return res
          .status(429)
          .json(formatResponse(429, 'userId и recipeId невалидны', null, 'invalid ids'));
      }

      const deleted = await FavoriteService.remove(+userId, +recipeId);
      if (!deleted) {
        return res
          .status(404)
          .json(formatResponse(404, 'запись избранного не найдена'));
      }

      return res
        .status(200)
        .json(formatResponse(200, 'рецепт удалён из избранного', deleted));
    } catch ({ message }) {
      console.error('======FavoriteController.delete===\r\n', message)
      return res
        .status(500)
        .json(formatResponse(500, 'внутренняя ошибка сервера', null, message));
    }
  }

  static async check(req, res) {
    try {
      const { userId, recipeId } = req.query;
      if (!isValidId(userId) || !isValidId(recipeId)) {
        return res
          .status(429)
          .json(formatResponse(429, 'userId и recipeId невалидны', null, 'invalid ids'));
      }

      const exists = await FavoriteService.exists(+userId, +recipeId);
      return res
        .status(200)
        .json(formatResponse(200, 'проверка выполнена', { isFavorite: !!exists, favorite: exists }));
    } catch ({ message }) {
      console.error('======FavoriteController.check===\r\n', message);
      return res
        .status(500)
        .json(formatResponse(500, 'внутренняя ошибка сервера', null, message));
    }
  }
}



module.exports = FavoriteController;
