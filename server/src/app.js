const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const express = require("express");
const serverConfig = require("./config/serverConfig");
const apiRoutes = require("./routes/api.routes");
const mealRoutes = require("./routes/meal.routes"); // Изменено с spoonacularRoutes

const { PORT } = process.env || 3000;

const app = express();

serverConfig(app);

app.use("/api/meals", mealRoutes); // Изменено с /api/spoonacular
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
