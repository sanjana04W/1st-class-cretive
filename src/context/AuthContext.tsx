"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { type User } from "firebase/auth";
import { subscribeToAuthState, getAdminUser } from "@/lib/auth";
import type { AdminUser } from "@/types";

interface AuthContextValue {
  user: User | null;
  adminUser: AdminUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  adminUser: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToAuthState(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const au = await getAdminUser(firebaseUser.uid);
        setAdminUser(au);
      } else {
        setAdminUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, adminUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
