import { ReactNode, createContext, useEffect, useState } from 'react';
import Session from 'supertokens-web-js/recipe/session';

export interface AuthContextType {
  isLoggedIn: boolean | null;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  recheckAuthStatus: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const sessionExists = await Session.doesSessionExist();
      setIsLoggedIn(sessionExists);
    };
    checkSession();
  }, []);

  const logout = async () => {
    try {
      await Session.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const recheckAuthStatus = async () => {
    const sessionExists = await Session.doesSessionExist();
    setIsLoggedIn(sessionExists);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        logout,
        isLoading,
        setIsLoading,
        recheckAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
