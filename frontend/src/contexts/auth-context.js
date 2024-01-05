import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogged(true);
      setToken(JSON.parse(token));
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await fetch("http://localhost:8080/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    setToken(data.token);
    localStorage.setItem("token", JSON.stringify(data.token));
    setIsLogged(true);
  };

  const logout = () => {
    setToken(null);
    setIsLogged(false);
  };

  const register = async (credentials) => {
    const response = await fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    setToken(data.token);
    localStorage.setItem("token", JSON.stringify(data.token));
    setIsLogged(true);
  };

  if (loading) return <></>

  return (
    <AuthContext.Provider value={{ isLogged, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
