import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import RecipePage from "./components/RecipePage";
import FavoritesPage from "./components/FavoritesPage";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";

import "./App.css";

function App() {

  return (
    <Router>
      <Header /> 
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/recipes/:id" element={<RecipePage />} />{" "}
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </Router>
  );
}


export default App;
