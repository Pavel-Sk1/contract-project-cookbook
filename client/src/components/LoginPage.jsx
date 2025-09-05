import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import { UserValidator } from "../entities/user/UserValidator";
import { UserService } from "../entities/user/UserService";
import { setAccessToken } from "../shared/lib/axiosInstance";

const INITIAL_INPUTS_DATA = {
  email: '',
  password: '',
};

function LoginPage({setUser}) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     console.log("Attempting to log in with:", { email, password });
  //     await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация задержки
  //     console.log("Login successful!");
  //     navigate("/");
  //   } catch (err) {
  //     console.error("Login error:", err);
  //     setError("Ошибка входа: Неверные учетные данные или произошла ошибка.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { isValid, error } = UserValidator.validateSignInData(inputs);

    if (!isValid) {
      alert(error);
      return;
    }

    try {
      const serverResponse = await UserService.signIn(inputs);

      if (serverResponse.error) {
        alert(serverResponse.error);
        return;
      }

      if (serverResponse.statusCode === 200) {
        setUser(serverResponse.data.user);
        setAccessToken(serverResponse.data.accessToken);
        setInputs(INITIAL_INPUTS_DATA);
        navigate('/');
      }
    } catch (error) {
      alert(error.response.data.error || 'Ошибка при входе');
      setError("Ошибка входа: Неверные учетные данные или произошла ошибка.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-card">
        <h2>Вход в аккаунт</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"              
              value={inputs.email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"              
              value={inputs.password}
              onChange={onChangeHandler}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
