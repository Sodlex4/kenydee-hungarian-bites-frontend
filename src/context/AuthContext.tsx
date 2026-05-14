import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { ADMIN_PASSWORD } from '../lib/env';

const AUTH_KEY = 'admin-auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === 'true'
  );

  const login = useCallback((password: string): boolean => {
    const valid = password === ADMIN_PASSWORD;
    if (valid) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
    }
    return valid;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
