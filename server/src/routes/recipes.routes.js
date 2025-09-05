const router = require('express').Router();
const RecipeController = require('../controllers/Recipe.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

router
  .get('/', RecipeController.getAll)
  .get('/:id', RecipeController.getById)
  .post('/', verifyAccessToken, RecipeController.create)
  .put('/:id', verifyAccessToken, RecipeController.updateById)
  .delete('/:id', verifyAccessToken, RecipeController.deleteById);

module.exports = router;