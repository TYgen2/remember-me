import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  authConfirmed: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ authConfirmed: false, loading: true });

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { getItem } = useLocalStorage("authConfirmed");
  const [authConfirmed, setAuthConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthStatus = async () => {
      const status = await getItem();
      setAuthConfirmed(status);
      setLoading(false);
    };
    loadAuthStatus();
  }, [getItem]);

  return (
    <AuthContext.Provider value={{ authConfirmed, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
