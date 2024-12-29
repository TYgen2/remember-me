import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthMethod } from "../types/auth";
import { useLocalStorage } from "../hooks/use-local-storage";

interface AuthContextType {
  authMethod: AuthMethod;
  updateAuthMethod: (method: AuthMethod) => void;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { getItem, setItem } = useLocalStorage("authMethod");
  const [authMethod, setAuthMethod] = useState<AuthMethod>(undefined);

  useEffect(() => {
    const loadAuthMethod = async () => {
      const method = await getItem();
      setAuthMethod(method);
    };
    loadAuthMethod();
  }, [getItem]);

  const updateAuthMethod = async (method: AuthMethod) => {
    try {
      setAuthMethod(method);
      await setItem(method);
    } catch (error) {
      console.error("Failed to update authentication method:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authMethod,
        updateAuthMethod,
      }}
    >
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
