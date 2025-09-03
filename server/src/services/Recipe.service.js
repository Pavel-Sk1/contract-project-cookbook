const { Recipe, User} = require("../db/models");

class RecipeService {
  static async getAll() {
    const recipes = await Recipe.findAll({
      include: {
        model: User,
        attributes: ["id", "username", "email"],
        through: { attributes: [] },
      },
    });
    return recipes;
  }

  static async getById(id) {
    return await Recipe.findByPk(id, {
      include: {
        model: User,
        attributes: ["id", "username", "email"],
        through: { attributes: [] },
      },
    });
  }

  static async create(data) {
    return await Recipe.create(data);
  }

  static async updateById(id, data) {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) return null;

    const fields = ["title", "instructions", "ingredients", "cooking_time", "quantity_ingredient", "img_url"];
    fields.forEach(field => {
      if (data[field] !== undefined) {
        recipe[field] = data[field];
      }
    });

    await recipe.save();
    return recipe;
  }

  static async deleteById(id) {
    return await Recipe.destroy({ where: { id } });
  }
}

module.exports = RecipeService;
