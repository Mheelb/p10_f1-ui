"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string, email: string) => void;
  logout: () => void;
  email: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("email");
    if (token && email) {
      setIsAuthenticated(true);
      setEmail(email);
    }
  }, []);

  const login = (token: string, email: string) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("email", email);
    setIsAuthenticated(true);
    setEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("email");
    setIsAuthenticated(false);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};