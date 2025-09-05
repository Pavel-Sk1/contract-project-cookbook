
const { Favorite, Recipe } = require('../db/models');

class FavoriteService {
  static async getAll() {
    return Favorite.findAll({
      include: [{ model: Recipe, attributes: ['id', 'title', 'img_url'] }],
      order: [['createdAt', 'DESC']],
    });
  }

  static async getByUser(userId) {
     const dataDb = await Favorite.findAll({
      where: { userId },
      include: [{ model: Recipe, attributes: ['id', 'title', 'img_url', 'cooking_time', 'quantity_ingredient'] }],
      order: [['createdAt', 'DESC']],
      raw: true
    });
    // const result = dataDb.get({plain: true})
    return dataDb 
  }

  static async add(userId, recipeId) {
    const favorite = await Favorite.create({ userId, recipeId });
   
    return Favorite.findByPk(favorite.id, {
      include: [{ model: Recipe, attributes: ['id', 'title', 'img_url'] }],
    });
  }

  static async remove(userId, recipeId) {
    return Favorite.destroy({ where: { userId, recipeId } });
  }

  static async exists(userId, recipeId) {
    return Favorite.findOne({
      where: { userId, recipeId },
      include: [{ model: Recipe, attributes: ['id', 'title', 'img_url'] }],
    });
  }
}

module.exports = FavoriteService;
