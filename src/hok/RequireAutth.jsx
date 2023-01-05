import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  //  достаём пользователя
  const { user } = useAuth();

  // Если пользователя есть, мы попадаем на приватную страницу.
  // Приватная страница - это любая, которая является дочерней для этого элемента. см в App, в роуты
  if (!user) {
    // Узнаём откуда мы пришли, благодаря state, который мы передаём дальше
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
