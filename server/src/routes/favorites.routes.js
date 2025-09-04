const router = require('express').Router();
const favorites = require('../controllers/favorites.controller');

router.get('/', favorites.list);
router.get('/user/:userId', favorites.listByUser);
router.get('/check', favorites.check);
router.post('/', favorites.add);
router.delete('/', favorites.remove);

module.exports = router