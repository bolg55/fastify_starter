import { ReactNode, createContext, useEffect, useState } from 'react';
import Session from 'supertokens-web-js/recipe/session';

export interface AuthContextType {
  isLoggedIn: boolean | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const sessionExists = await Session.doesSessionExist();
      setIsLoggedIn(sessionExists);
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
