import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'shopmini-user';
const FAKE_PASSWORD = '123456';

function getInitialUser(): User | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    const parsed: unknown = JSON.parse(saved);
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'username' in parsed &&
      typeof (parsed as { username: unknown }).username === 'string'
    ) {
      return { username: (parsed as { username: string }).username };
    }
  } catch {
    // dữ liệu hỏng -> bỏ qua
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser);

  const login = useCallback((username: string, password: string): boolean => {
    const name = username.trim();
    if (!name || password !== FAKE_PASSWORD) return false;
    const next: User = { username: name };
    setUser(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth phải được dùng bên trong AuthProvider');
  return ctx;
}
