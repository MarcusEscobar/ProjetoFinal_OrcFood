import React, { createContext, useEffect, useState } from "react";
import { api, createSession } from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      setUser(JSON.parse(user));
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await createSession(email, password);

    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);

    api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

    setUser(response.data.user);

    localStorage.setItem("moedas", response.data.user.moedas);
    localStorage.setItem("c10", response.data.user.cupons.c10);
    localStorage.setItem("c20", response.data.user.cupons.c20);
    localStorage.setItem("c30", response.data.user.cupons.c30);
    localStorage.setItem("tickets", response.data.user.tickets);

    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("moedas");
    localStorage.removeItem("tickets");

    api.defaults.headers.common.Authorization = null;

    setUser(null);

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
