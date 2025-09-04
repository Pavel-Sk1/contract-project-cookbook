import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [userMenuOpen, setUserMenuOpen] = useState(false); // Состояние для выпадающего меню пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Возвращаем локальное состояние

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
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
              <Link to="/recipes">Рецепты</Link>
            </li>
          </ul>

          <div className="user-menu">
            <button className="user-menu-toggle" onClick={toggleUserMenu}>
              {isLoggedIn ? "Профиль" : "Войти/Рег."} {}
              <span className="dropdown-arrow">▼</span>
            </button>
            <ul className={`user-dropdown-menu ${userMenuOpen ? "open" : ""}`}>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/favorites" onClick={toggleUserMenu}>
                      Избранное
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        toggleUserMenu();
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
