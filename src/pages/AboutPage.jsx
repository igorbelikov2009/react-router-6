// eslint-disable-next-line no-unused-vars
import { Route, Routes, Link, Outlet } from "react-router-dom";
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <h1 className="title">AboutPage</h1>
      <p>This is a demo website about React-router-dom library</p>
      <ul>
        <li>
          <Link to="contacts">Our contacts </Link>
        </li>
        <li>
          <Link to="team">Our team </Link>
        </li>
      </ul>

      {/* <Routes>
        <Route path="contacts" element={<p> Our contacts</p>} />
        <Route path="team" element={<p> Our team</p>} />
      </Routes> */}

      {/* Без Outlet, реакт не знает, куда, конкретно вставлять
       компоненты <p> Our contacts</p> или <p> Our team</p> */}

      {/*  Устанавливая  <Outlet /> в определённое место, мы указываем реакту, в каком 
      месте должны отображаться наши вложенные компоненты */}
      <Outlet />
    </div>
  );
};

export default AboutPage;
