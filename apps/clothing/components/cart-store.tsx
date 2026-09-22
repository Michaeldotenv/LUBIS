"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../app/data";

export type CartItem = {
  slug: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  material: string;
  fit: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (index: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "lubis-clothing-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      total,
      count,
      addItem(product, size, color) {
        setItems((current) => {
          const next = [...current];
          const existing = next.find((item) => item.slug === product.slug && item.size === size && item.color === color);
          if (existing) {
            existing.quantity += 1;
            return next;
          }
          return [
            ...next,
            {
              slug: product.slug,
              name: product.name,
              category: product.category,
              collection: product.collection,
              price: product.price,
              size,
              color,
              quantity: 1,
              material: product.material,
              fit: product.fit
            }
          ];
        });
      },
      removeItem(index) {
        setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
      },
      clear() {
        setItems([]);
      }
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
