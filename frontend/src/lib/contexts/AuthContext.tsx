// src/lib/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/lib/types';

export type User = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  admin: {
    password: 'admin123',
    user: {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      fullName: 'مدير النظام',
      role: UserRole.SYSTEM_ADMIN,
    },
  },
  translator1: {
    password: 'trans123',
    user: {
      id: '2',
      username: 'translator1',
      email: 'translator1@example.com',
      fullName: 'أحمد المترجم',
      role: UserRole.TRANSLATOR,
    },
  },
  reviewer1: {
    password: 'review123',
    user: {
      id: '3',
      username: 'reviewer1',
      email: 'reviewer1@example.com',
      fullName: 'سارة المراجعة',
      role: UserRole.REVIEWER,
    },
  },
  dataentry1: {
    password: 'data123',
    user: {
      id: '4',
      username: 'dataentry1',
      email: 'dataentry1@example.com',
      fullName: 'علي مدخل البيانات',
      role: UserRole.DATA_ENTRY,
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('mock-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUser = MOCK_USERS[username];
    if (!mockUser || mockUser.password !== password) {
      setIsLoading(false);
      throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
    const user = mockUser.user;
    setUser(user);
    localStorage.setItem('mock-user', JSON.stringify(user));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock-user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}