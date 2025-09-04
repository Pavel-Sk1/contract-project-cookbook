const router = require('express').Router();
const recipesRoutes = require('./recipes.routes');
const formatResponse = require('../utils/formatResponse');
const authRoutes = require('./auth.routes');
const favoritesRoutes = require('./favorites.routes');

router.use('/recipes', recipesRoutes);
router.use('/auth', authRoutes);
router.use('/favorites', favoritesRoutes);

router.use((req, res) => {
  res
    .status(404)
    
    .json(formatResponse(404, 'Маршрут не найден', null, 'Маршрут не найден'));
});


module.exports = router;

