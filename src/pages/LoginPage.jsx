import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signin } = useAuth();

  const fromPage = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    // Получаем информацию о пользователе, формула возможна благодаря name="username"
    const user = form.username.value;

    // Функция принимает нового пользователя и колбэк cl
    // Колбэк - navigate() и .. куда надо перейти?
    // Туда, откуда я пришёл на страницу авторизации fromPage.
    // Указываем { replace: true }, чтобы по кнопке назад мы не могли вернуться
    signin(user, () => navigate(fromPage, { replace: true }));
  };

  return (
    <div>
      <h1>LoginPage</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input type="text" name="username" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export { LoginPage };
