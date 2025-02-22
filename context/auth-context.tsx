import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSecureStore } from "~/hooks/use-secure-store";
import { hasSetLocalAuth } from "~/lib/auth";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  hasAuthSetup: boolean;
  authConfirmed: boolean | undefined;
  loading: boolean;
  refreshAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({ hasAuthSetup: false, authConfirmed: false, loading: true, refreshAuthStatus: async () => { } });

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // Use SecureStore to store the auth status, better security than async storage
  const { getSecureValue } = useSecureStore("authConfirmed");

  const [hasAuthSetup, setHasAuthSetup] = useState(false);
  const [authConfirmed, setAuthConfirmed] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const loadAuthData = useCallback(async () => {
    // Fetch auth status and setup
    setLoading(true);
    const status = await getSecureValue();
    const hasSetup = await hasSetLocalAuth();

    // hasSetup > 0 means local auth is set up
    setHasAuthSetup(hasSetup > 0);
    setAuthConfirmed(status);
    setLoading(false);
  }, [getSecureValue]);

  // Initial load of auth status
  useEffect(() => {
    loadAuthData();
  }, []);

  const refreshAuthStatus = useCallback(async () => {
    await loadAuthData();
  }, [loadAuthData]);

  return (
    <AuthContext.Provider value={{ hasAuthSetup, authConfirmed, loading, refreshAuthStatus }}>
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
