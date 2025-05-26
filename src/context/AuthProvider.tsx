"use client";

import { createContext, useContext, useState, useEffect } from "react";
import userService from "@/services/userService";
import { User } from "@/types/User";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string, email: string) => void;
  logout: () => void;
  email: string | null;
  userId: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    
    if (token && email) {
      setIsAuthenticated(true);
      setEmail(email);
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      if (isAuthenticated && email && !userId) {
        try {
          const response = await userService().getAll();
          if (response.status === 200) {
            const user = response.data.find((user: User) => user.email === email);
            if (user && user.id) {
              setUserId(user.id);
              localStorage.setItem('userId', user.id);
            }
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      }
    };

    fetchUserId();
  }, [isAuthenticated, email]);

  const login = (token: string, email: string) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("email", email);
    setIsAuthenticated(true);
    setEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, userId, login, logout }}>
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