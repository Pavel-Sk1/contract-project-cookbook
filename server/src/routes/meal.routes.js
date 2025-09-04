const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getRecipeById,
} = require("../controllers/meal.controller");

router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipeById);

module.exports = router;
