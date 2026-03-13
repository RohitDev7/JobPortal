import { createContext, useState, useEffect } from "react";
import API from "../config/apiConfig";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.get(`/users?email=${email}&password=${password}`);
      if (res.data.length > 0) {
        const loggedUser = res.data[0];
        setUser(loggedUser);
        localStorage.setItem("user", JSON.stringify(loggedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}