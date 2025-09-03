import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage"; // Импортируем новую HomePage
import RecipePage from "./components/RecipePage";
import FavoritesPage from "./components/FavoritesPage";
import RegistrationPage from "./components/RegistrationPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          {/* Главная страница теперь HomePage */}
          <Route path="/recipes/:id" element={<RecipePage />} />{" "}
          {/* Маршрут для страницы рецепта с динамическим ID */}
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

// Временный компонент Home будет удален

export default App;
