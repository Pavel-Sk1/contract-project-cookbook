import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { setAccessToken } from "../shared/lib/axiosInstance";
import { useNavigate } from "react-router-dom";
import { UserService } from "../entities/user/UserService";


function Header({user, setUser}) {
  const [userMenuOpen, setUserMenuOpen] = useState(false); // Состояние для выпадающего меню пользователя  
  const navigate = useNavigate();


  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  const handleSignOut = async () => {
    try {
      const response = await UserService.signOut();
      if (response.statusCode === 200) {
        setUser(null);
        setAccessToken('');
        navigate('/');
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo-container">
          <img
            src="/src/assets/красный-и-зеленый-логотип-chili-126557028.png"
            alt="Логотип"
            className="header-logo"
          />
          <span className="site-title">Агрегатор рецептов</span>
        </Link>
        <nav className="main-nav">
          <ul className="nav-menu-primary">
            <li>
              <Link to="/">Рецепты</Link>
            </li>
          </ul>

          <div className="user-menu">
            <button className="user-menu-toggle" onClick={toggleUserMenu}>
              {user ? "Профиль" : "Войти/Рег."} {}
              <span className="dropdown-arrow">▼</span>
            </button>
            <ul className={`user-dropdown-menu ${userMenuOpen ? "open" : ""}`}>
              {user ? (
                <>
                  <li>
                    <Link to="/favorites" onClick={toggleUserMenu}>
                      Избранное
                    </Link>
                  </li>
                  <li>
                    <button

                      onClick={() => {                        
                        toggleUserMenu();
                        handleSignOut();
                      }}
                    >
                      Выйти
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/register" onClick={toggleUserMenu}>
                      Зарегистрироваться
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={toggleUserMenu}>
                      Войти
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
