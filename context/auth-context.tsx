import React, { createContext, useContext, useEffect, useState } from "react";
import { useSecureStore } from "~/hooks/use-secure-store";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  authConfirmed: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ authConfirmed: false, loading: true });

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { getSecureValue } = useSecureStore("authConfirmed");
  const [authConfirmed, setAuthConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthStatus = async () => {
      const status = await getSecureValue();
      setAuthConfirmed(status);
      setLoading(false);
    };
    loadAuthStatus();
  }, [getSecureValue]);

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
