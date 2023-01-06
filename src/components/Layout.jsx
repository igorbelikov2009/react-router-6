import { Outlet } from "react-router-dom";
import React from "react";
import { CustomLink } from "./CustomLink";

const Layout = () => {
  return (
    <>
      <header className="header">
        <CustomLink to="/" className="routes">
          Home
        </CustomLink>

        <CustomLink to="/posts" className="routes">
          Blog
        </CustomLink>

        <CustomLink to="/about" className="routes">
          About
        </CustomLink>
      </header>

      {/* Этот  <Outlet /> и есть лайаут, то что меняется.  */}
      <main className="container">
        <Outlet />
      </main>

      <footer className="container"> Footer 2023</footer>
    </>
  );
};

export { Layout };
