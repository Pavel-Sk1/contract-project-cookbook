const router = require('express').Router();
const FavoriteController = require('../controllers/favorites.controller');

router.get('/', FavoriteController.getAll);
router.get('/:userId', FavoriteController.getByUser);
router.get('/check', FavoriteController.check);
router.post('/', FavoriteController.create);
router.delete('/:userId/:recipeId', FavoriteController.delete);

module.exports = router;
