import React, { useState } from "react";
import "./RegistrationPage.css";
import { UserValidator } from "../entities/user/UserValidator";
import { UserService } from "../entities/user/UserService";
import { setAccessToken } from "../shared/lib/axiosInstance";
import { useNavigate } from "react-router";

const INITIAL_INPUTS_DATA = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

function RegistrationPage({ setUser }) {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    if (error) setError("");
    if (message) setMessage("");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    console.log("Отправляемые данные:", inputs);

    const { isValid, error: validationError } =
      UserValidator.validateSignUpData(inputs);
    if (!isValid) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      console.log("Вызов UserService.signUp...");
      const serverResponse = await UserService.signUp({
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      });

      console.log("Ответ сервера:", serverResponse);

      if (serverResponse.error) {
        setError(serverResponse.error);
        return;
      }

      if (serverResponse.statusCode === 201 || serverResponse.status === 201) {
        const userData = serverResponse.data || serverResponse;
        const accessToken = userData.accessToken || userData.data?.accessToken;
        const user = userData.user || userData.data?.user;

        if (accessToken) {
          setAccessToken(accessToken);
        }

        if (user && setUser) {
          setUser(user);
        }

        setMessage("Регистрация прошла успешно!");
        setInputs(INITIAL_INPUTS_DATA);

        setTimeout(() => navigate("/"), 1000);
      } else {
        setError("Неизвестная ошибка сервера");
      }
    } catch (error) {
      console.error("Полная ошибка:", error);
      console.error("Данные ошибки:", error.response?.data);

      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Произошла неизвестная ошибка при регистрации");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-page-container">
      <div className="registration-form-card">
        <h2 className="registration-title">Регистрация</h2>

        {error && (
          <div className="error-message">
            <strong>Ошибка:</strong> {error}
          </div>
        )}

        {message && (
          <div className="success-message">
            <strong>Успех:</strong> {message}
          </div>
        )}

        <form onSubmit={onSubmitHandler} className="registration-form">
          <div className="form-group">
            <label htmlFor="username">Логин:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Введите логин"
              onChange={onChangeHandler}
              value={inputs.username}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Почта:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              onChange={onChangeHandler}
              value={inputs.email}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Не менее 8 символов"
              onChange={onChangeHandler}
              value={inputs.password}
              required
              disabled={isLoading}
            />
            <small>
              Должен содержать заглавные, строчные буквы, цифры и спецсимволы
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="repeatPassword">Повторите пароль:</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Повторите пароль"
              onChange={onChangeHandler}
              value={inputs.repeatPassword}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
