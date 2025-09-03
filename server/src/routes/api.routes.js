const router = require('express').Router();
const recipesRoutes = require('./recipes.routes');
const formatResponse = require('../utils/formatResponse');


router.use('/recipes', recipesRoutes);

router.use((req, res) => {
  res
    .status(404)
    .json(formatResponse(404, 'Маршрут не найден', null, 'Маршрут не найден'));
});

module.exports = router;