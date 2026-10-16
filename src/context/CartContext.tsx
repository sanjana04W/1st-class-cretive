"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface CartItem {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  variant?: string; // e.g. "Pack of 1", "Standard", "Personalized"
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("fcc_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        // Pre-fill initial sample items matching user screenshot 3 & 4
        setItems([
          {
            id: "coll-001",
            title: "Glitter Alphabet Keychain",
            slug: "handcrafted-resin-creation-1-coll-001",
            price: 550,
            originalPrice: 750,
            image: "/484810488_1103650881774158_3999044029988274536_n.jpg",
            category: "Resin Keychains",
            variant: "Letter 'A' / Gold Flakes",
            quantity: 1,
          },
          {
            id: "coll-002",
            title: "Wedding Keepsake Cake Box",
            slug: "bespoke-wedding-invitation-2-coll-002",
            price: 1100,
            originalPrice: 1350,
            image: "/484074106_1098277412311505_6713907112004454121_n.jpg",
            category: "Cake Boxes",
            variant: "Ivory & Gold Ribbon",
            quantity: 1,
          },
        ]);
      }
    } catch {
      // fallback
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("fcc_cart", JSON.stringify(items));
      } catch {
        // storage full
      }
    }
  }, [items, isLoaded]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (product: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === product.id && i.variant === product.variant
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });
    toast.success(`Added "${product.title}" to cart!`);
    setIsOpen(true);
  };

  const removeFromCart = (id: string, variant?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.id === id && (variant ? i.variant === variant : true)))
    );
    toast.success("Item removed from cart");
  };

  const updateQuantity = (id: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, variant);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && (variant ? i.variant === variant : true)
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
