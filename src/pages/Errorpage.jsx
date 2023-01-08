import React from "react";
import { useRouteError } from "react-router-dom";

const Errorpage = () => {
  const error = useRouteError();
  // На уровне компонента из хука useRouteError() получаем объект ошибки,
  // и текст ошибки вывести на экран.

  return (
    <div>
      <h1>{error.status} </h1>
      <h2>{error.statusText || "Somesing goes wrong!"}</h2>
    </div>
  );
};

export default Errorpage;
