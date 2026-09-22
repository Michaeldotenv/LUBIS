"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CustomerSession = {
  name: string;
  email: string;
  phone?: string;
};

type AuthContextValue = {
  user: CustomerSession | null;
  signIn: (user: CustomerSession) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const storageKey = "lubis-clothing-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomerSession | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? (JSON.parse(raw) as CustomerSession) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(storageKey, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(storageKey);
    }
  }, [user]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    signIn(nextUser) {
      setUser(nextUser);
    },
    signOut() {
      setUser(null);
    }
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
