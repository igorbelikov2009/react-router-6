import React, { createContext, useState } from "react";

// Создаём контекст
export const AuthContext = createContext(null);

// Создаём провайдер
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // cb- кратко callback( в нашем случае - переадрессация, navigate)
  const signin = (newUser, cb) => {
    setUser(newUser);
    cb();
    console.log(user);
  };
  const signout = (cb) => {
    setUser(null);
    cb();
    console.log(user);
  };

  // Создаём value для провайдера
  const value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
