"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { type User } from "firebase/auth";
import { subscribeToAuthState, getAdminUser } from "@/lib/auth";
import type { AdminUser } from "@/types";

interface AuthContextValue {
  user: User | null;
  adminUser: AdminUser | null;
  loading: boolean;
  loginDemoAdmin: (email?: string, name?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  adminUser: null,
  loading: true,
  loginDemoAdmin: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkDemoUser = () => {
    if (typeof window !== "undefined") {
      const demoUser = localStorage.getItem("admin_demo_user");
      if (demoUser) {
        try {
          const parsed = JSON.parse(demoUser);
          setUser({
            uid: parsed.uid,
            email: parsed.email,
            displayName: parsed.name,
          } as unknown as User);
          setAdminUser({
            uid: parsed.uid,
            email: parsed.email,
            name: parsed.name,
            role: parsed.role,
            isActive: true,
            createdAt: new Date(),
          });
          return true;
        } catch (e) {
          console.error(e);
        }
      }
    }
    return false;
  };

  const loginDemoAdmin = (adminEmail: string = "admin@lillyumfragrance.lk", adminName: string = "Super Admin") => {
    const adminUid = "admin-uid-" + adminEmail.replace(/[^a-zA-Z0-9]/g, "-");
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_demo_user", JSON.stringify({
        uid: adminUid,
        email: adminEmail,
        name: adminName,
        role: "owner",
      }));
    }
    setUser({
      uid: adminUid,
      email: adminEmail,
      displayName: adminName,
    } as unknown as User);
    setAdminUser({
      uid: adminUid,
      email: adminEmail,
      name: adminName,
      role: "owner",
      isActive: true,
      createdAt: new Date(),
    });
    setLoading(false);
  };

  const logout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_demo_user");
    }
    setUser(null);
    setAdminUser(null);
    try {
      await import("@/lib/auth").then((m) => m.adminSignOut());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const isDemo = checkDemoUser();
    if (isDemo) {
      setLoading(false);
      return;
    }

    const unsub = subscribeToAuthState(async (firebaseUser) => {
      // Re-verify demo session in case it was set
      if (checkDemoUser()) {
        setLoading(false);
        return;
      }
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
    <AuthContext.Provider value={{ user, adminUser, loading, loginDemoAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
