import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

type AuthState = {
  user: User | null;
  token: string | null;
  errorMessage: string | null;
  actions: {
    register: (user: User) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  }
};

const AuthContext = createContext<AuthState | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = async (user: User) => {
    try {
      const res = await axios.post("/auth/register", user);
      const userData = res.data;
      if (res.status === 201 && userData.token) {
        localStorage.setItem("authToken", userData.token);
        localStorage.setItem("authUser", JSON.stringify(userData));
        setUser(userData);
        setToken(userData.token);
        setErrorMessage(null);
      } else {
        setErrorMessage("Registration failed. No token recieved.")
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message || "An error occurred. Please try again.");
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      const userData = res.data;
      if (res.status === 200 && userData.token) {
        localStorage.setItem("authToken", userData.token);
        localStorage.setItem("authUser", JSON.stringify(userData));
        setUser(userData);
        setToken(userData.token);
        setErrorMessage(null);
      } else {
        setErrorMessage("Login failed. No token recieved.")
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message || "Incorrect email or password.");
    }
  }

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  }

  const actions = {
    register,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={{ user, token, errorMessage, actions }}>{ children }</AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };