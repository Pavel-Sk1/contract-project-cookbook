const router = require('express').Router();
const FavoriteController = require('../controllers/favorite.controller');

router.get('/', FavoriteController.getAll);
router.get('/user/:userId', FavoriteController.getByUser);
router.get('/check', FavoriteController.check);
router.post('/', FavoriteController.create);
router.delete('/:userId/:recipeId', FavoriteController.delete);

module.exports = router;
