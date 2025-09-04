import React, { useState } from "react";
import "./RegistrationPage.css";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Регистрационные данные:", formData);
    setMessage("Регистрация прошла успешно (имитация)!");
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className="registration-page-container">
      <div className="registration-form-card">
        <h2 className="registration-title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="login">Логин:</label>
            <input
              type="text"
              id="login"
              name="login"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Почта:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Зарегистрироваться
          </button>
        </form>
        {message && <p className="registration-message">{message}</p>}
      </div>
    </div>
  );
}

export default RegistrationPage;
