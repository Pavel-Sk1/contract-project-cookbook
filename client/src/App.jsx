import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import RecipePage from "./components/RecipePage";
import FavoritesPage from "./components/FavoritesPage";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";

import "./App.css";
import { useEffect, useState } from "react";
import { UserService } from "./entities/user/UserService";
import { setAccessToken } from "./shared/lib/axiosInstance";

function App() {
  const [user, setUser] = useState()

  const fetchUser = async () => {
    try {
      const dataFromServer = await UserService.refreshTokens();
      if (dataFromServer.error) {
        setUser(null);
        return;
      }
      if (dataFromServer.statusCode === 201) {
        setUser(dataFromServer.data.user);
        setAccessToken(dataFromServer.data.accessToken);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };
  useEffect(() => {
    fetchUser();    
  }, []);


  return (
    <Router>
      <Header user={user} setUser={setUser}/>
      <main>
        <Routes>
          <Route path="/" element={<HomePage user={user}/>} /> {}
          <Route path="/recipes/:id" element={<RecipePage />} /> {}
          <Route path="/favorites" element={<FavoritesPage user={user}/>} />
          <Route path="/register" element={<RegistrationPage setUser={setUser}/>} />
          <Route path="/login" element={<LoginPage setUser={setUser}/>} />
        </Routes>
      </main>
    </Router>
  );
}

// Временный компонент Home будет удален

export default App;
