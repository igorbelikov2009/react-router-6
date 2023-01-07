import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const Errorpage = () => {
  const error = useRouteError();
  // На уровне компонента из хука useRouteError() получаем объект ошибки,
  // дополнительный хелпер isRouteErrorResponse позволяет нам проверить
  // ошибку, связанна она с роутингом или нет, ну и текс ошибки вывести
  // на экран.

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status} </h1>
        {/* <h2>{error.statusText || "Somesing goes wrong!"}</h2> */}
        <h2>{error.data.message || "Somesing goes wrong!"}</h2>

        <h3>{error.data.reason}</h3>
      </div>
    );
  }
  throw error;
};

export default Errorpage;
