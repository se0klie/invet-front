import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("email");
    const storedUserID = localStorage.getItem("cedula");
    const storedName = localStorage.getItem("nombre");
    if (storedUser && storedUserID && storedName) {
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
    setUser(userData);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("cedula", userData.cedula);
    localStorage.setItem("nombre", userData.nombre);
  };

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("cedula");
    localStorage.removeItem("nombre");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
