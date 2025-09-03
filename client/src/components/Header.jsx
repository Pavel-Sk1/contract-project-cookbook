import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [userMenuOpen, setUserMenuOpen] = useState(false); // Состояние для выпадающего меню пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Предполагаем состояние авторизации

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          Агрегатор рецептов
        </Link>
        <nav className="main-nav">
          <ul className="nav-menu-primary">
            <li>
              <Link to="/recipes">Рецепты</Link>
            </li>
          </ul>

          <div className="user-menu">
            <button className="user-menu-toggle" onClick={toggleUserMenu}>
              {isLoggedIn ? "Профиль" : "Войти/Рег."}{" "}
              {/* Текст кнопки меняется в зависимости от статуса */}
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
