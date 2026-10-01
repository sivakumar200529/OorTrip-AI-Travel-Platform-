import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  loginWithEmail: (email: string, pass: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  updatePoints: (delta: number) => void;
  toggleSavedPlace: (id: string) => void;
}

const DEMO_USERS: Record<UserRole, User> = {
  tourist: {
    id: 'user-tourist-01',
    name: 'Siva',
    email: 'siva.tourist@oortrip.ai',
    role: 'tourist',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    points: 1250,
    ecoScore: 92,
    savedPlaces: ['mahabalipuram', 'thanjavur', 'madurai']
  },
  business: {
    id: 'user-business-01',
    name: 'Meenakshi Chettinad Stays',
    email: 'partner@chettinadheritage.com',
    role: 'business',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    points: 3400,
    ecoScore: 96
  },
  admin: {
    id: 'user-admin-01',
    name: 'TN Tourism Administrator',
    email: 'admin@tourism.tn.gov.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(DEMO_USERS.tourist); // default to Siva for instant tourist experience

  useEffect(() => {
    const savedUser = localStorage.getItem('oortrip_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(DEMO_USERS.tourist);
      }
    }
  }, []);

  const loginAs = (role: UserRole) => {
    const demo = DEMO_USERS[role];
    setUser(demo);
    localStorage.setItem('oortrip_user', JSON.stringify(demo));
  };

  const loginWithEmail = async (email: string, _pass: string, requestedRole: UserRole = 'tourist'): Promise<boolean> => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: requestedRole,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      points: 500,
      ecoScore: 85,
      savedPlaces: []
    };
    setUser(newUser);
    localStorage.setItem('oortrip_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('oortrip_user');
  };

  const updatePoints = (delta: number) => {
    if (!user) return;
    const updated = { ...user, points: (user.points || 0) + delta };
    setUser(updated);
    localStorage.setItem('oortrip_user', JSON.stringify(updated));
  };

  const toggleSavedPlace = (id: string) => {
    if (!user) return;
    const current = user.savedPlaces || [];
    const updatedPlaces = current.includes(id)
      ? current.filter(p => p !== id)
      : [...current, id];
    const updated = { ...user, savedPlaces: updatedPlaces };
    setUser(updated);
    localStorage.setItem('oortrip_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'tourist',
        isAuthenticated: !!user,
        loginAs,
        loginWithEmail,
        logout,
        updatePoints,
        toggleSavedPlace,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
