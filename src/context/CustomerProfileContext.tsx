"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
export interface UserAddress {
  street: string;
  city: string;
  district: string;
  postalCode?: string;
}

export interface UserOrderHistory {
  id: string;
  orderNumber: string;
  date: string;
  items: {
    title: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  subtotal: number;
  deliveryFee: number;
  district: string;
  street: string;
  city: string;
  postalCode?: string;
  notes?: string;
  status: "Pending" | "Confirmed" | "Processing" | "Dispatched" | "Delivered" | "Cancelled";
  paymentMethod: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  placedAt: string; // ISO string
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string; // hashed in real app; stored plaintext here for demo
  address: UserAddress;
  notes?: string;
  orders: UserOrderHistory[];
  createdAt: string;
}

/* ─────────────────────────────────────────
   Context shape
───────────────────────────────────────── */
interface CustomerProfileContextType {
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addOrder: (order: UserOrderHistory) => void;
  isLoggedIn: boolean;
  /** Register a new customer account. Returns error string or null on success. */
  registerCustomer: (name: string, email: string, phone: string, password: string) => string | null;
  /** Login with email + password. Returns error string or null on success. */
  loginCustomer: (email: string, password: string) => string | null;
  logoutCustomer: () => void;
  /** Legacy demo login */
  loginAsDemo: () => void;
}

/* ─────────────────────────────────────────
   Defaults
───────────────────────────────────────── */
const GUEST_PROFILE: UserProfile = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: { street: "", city: "", district: "Colombo", postalCode: "" },
  orders: [],
  createdAt: new Date().toISOString(),
};

const STORAGE_KEY_CURRENT = "fcc_current_user_email";
const STORAGE_KEY_USERS = "fcc_users_db";
const STORAGE_KEY_ALL_ORDERS = "fcc_all_orders"; // admin-visible registry

/* ─────────────────────────────────────────
   Helpers to read/write the "users DB"
───────────────────────────────────────── */
function readUsersDB(): Record<string, UserProfile> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeUsersDB(db: Record<string, UserProfile>) {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(db));
  } catch {
    // storage full
  }
}

/** Append order to the global orders registry so the admin panel can see all orders. */
export function appendGlobalOrder(order: UserOrderHistory) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ALL_ORDERS);
    const all: UserOrderHistory[] = raw ? JSON.parse(raw) : [];
    all.unshift(order);
    localStorage.setItem(STORAGE_KEY_ALL_ORDERS, JSON.stringify(all));
  } catch {
    // ignore
  }
}

/** Read all orders (for admin panel). */
export function readAllOrders(): UserOrderHistory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ALL_ORDERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Update order status in global registry (for admin panel). */
export function updateGlobalOrderStatus(
  orderId: string,
  status: UserOrderHistory["status"]
) {
  try {
    const all = readAllOrders();
    const updated = all.map((o) => (o.id === orderId ? { ...o, status } : o));
    localStorage.setItem(STORAGE_KEY_ALL_ORDERS, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

/* ─────────────────────────────────────────
   Context + Provider
───────────────────────────────────────── */
const CustomerProfileContext = createContext<CustomerProfileContextType | undefined>(undefined);

export function CustomerProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(GUEST_PROFILE);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Restore session on mount
  useEffect(() => {
    const email = localStorage.getItem(STORAGE_KEY_CURRENT);
    if (email) {
      const db = readUsersDB();
      if (db[email]) {
        setProfile(db[email]);
        setIsLoggedIn(true);
      }
    }
    setIsLoaded(true);
  }, []);

  // Persist profile changes back to the users DB
  useEffect(() => {
    if (isLoaded && isLoggedIn && profile.email) {
      const db = readUsersDB();
      db[profile.email] = profile;
      writeUsersDB(db);
    }
  }, [profile, isLoaded, isLoggedIn]);

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    toast.success("Profile updated successfully!");
  };

  const addOrder = (order: UserOrderHistory) => {
    setProfile((prev) => ({ ...prev, orders: [order, ...prev.orders] }));
    // Also write to global admin registry
    appendGlobalOrder(order);
  };

  /* ── Register ── */
  const registerCustomer = (
    name: string,
    email: string,
    phone: string,
    password: string
  ): string | null => {
    const emailLower = email.toLowerCase().trim();
    const db = readUsersDB();
    if (db[emailLower]) return "An account with this email already exists.";

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: emailLower,
      phone: phone.trim(),
      password,
      address: { street: "", city: "", district: "Colombo", postalCode: "" },
      orders: [],
      createdAt: new Date().toISOString(),
    };
    db[emailLower] = newUser;
    writeUsersDB(db);
    localStorage.setItem(STORAGE_KEY_CURRENT, emailLower);
    setProfile(newUser);
    setIsLoggedIn(true);
    toast.success(`Welcome, ${name.trim()}! Account created.`);
    return null;
  };

  /* ── Login ── */
  const loginCustomer = (email: string, password: string): string | null => {
    const emailLower = email.toLowerCase().trim();
    const db = readUsersDB();
    const user = db[emailLower];
    if (!user) return "No account found with this email.";
    if (user.password !== password) return "Incorrect password.";
    localStorage.setItem(STORAGE_KEY_CURRENT, emailLower);
    setProfile(user);
    setIsLoggedIn(true);
    toast.success(`Welcome back, ${user.name}!`);
    return null;
  };

  /* ── Logout ── */
  const logoutCustomer = () => {
    localStorage.removeItem(STORAGE_KEY_CURRENT);
    setProfile(GUEST_PROFILE);
    setIsLoggedIn(false);
    toast.success("Signed out successfully.");
  };

  /* ── Legacy demo login ── */
  const loginAsDemo = () => {
    const demoEmail = "demo@1stclasscreative.lk";
    const db = readUsersDB();
    if (!db[demoEmail]) {
      const demo: UserProfile = {
        id: "usr-demo",
        name: "Chamari Perera",
        email: demoEmail,
        phone: "071 234 5678",
        password: "demo1234",
        address: { street: "No. 42/B, Flower Road", city: "Colombo 07", district: "Colombo", postalCode: "00700" },
        orders: [],
        createdAt: new Date().toISOString(),
      };
      db[demoEmail] = demo;
      writeUsersDB(db);
    }
    localStorage.setItem(STORAGE_KEY_CURRENT, demoEmail);
    setProfile(db[demoEmail]);
    setIsLoggedIn(true);
    toast.success("Signed in as Chamari Perera (demo)");
  };

  return (
    <CustomerProfileContext.Provider
      value={{ profile, updateProfile, addOrder, isLoggedIn, registerCustomer, loginCustomer, logoutCustomer, loginAsDemo }}
    >
      {children}
    </CustomerProfileContext.Provider>
  );
}

export function useCustomerProfile() {
  const ctx = useContext(CustomerProfileContext);
  if (!ctx) throw new Error("useCustomerProfile must be used within CustomerProfileProvider");
  return ctx;
}
