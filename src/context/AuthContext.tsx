import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { login as apiLogin, logout as apiLogout, isAuthenticated as checkAuth } from '../lib/api-auth';

const AUTH_KEY = 'admin-auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === 'true' && checkAuth()
  );

  const login = useCallback(async (password: string): Promise<boolean> => {
    const valid = await apiLogin('admin@hungarianbites.com', password);
    if (valid) {
      setIsAuthenticated(true);
    }
    return valid;
  }, []);

  const logout = useCallback(() => {
    apiLogout();
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType & { login: (password: string) => Promise<boolean> } => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
