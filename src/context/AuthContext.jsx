// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = Cookies.get("authToken");
    const storedUser = localStorage.getItem("email");
    const storedUserID = localStorage.getItem("cedula");
    const storedName = localStorage.getItem("nombre");
    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setUser({
        email: storedUser,
        cedula: storedUserID,
        nombre: storedName
      });
    } else {
      logout();
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("email", userData.email);
    localStorage.setItem("cedula", userData.cedula);
    localStorage.setItem("nombre", userData.nombre);
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("cedula");
    localStorage.removeItem("nombre");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
