import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </BrowserRouter>
// );

// Для загрузки данных через роутер, мы отказываемся от <BrowserRouter>,
// создаём RouterProvider в App.jsx

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
