import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { MenuItem } from "../types";

export interface CartItem {
  item: MenuItem;
  quantity: number;
  size: "s" | "m" | "l";
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, size?: "s" | "m" | "l") => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((menuItem: MenuItem, size: "s" | "m" | "l" = "s") => {
    setItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === menuItem.id && ci.size === size);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === menuItem.id && ci.size === size
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prev, { item: menuItem, quantity: 1, size }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((ci) => ci.item.id + ci.size !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((ci) => ci.item.id + ci.size !== id));
      return;
    }
    setItems((prev) =>
      prev.map((ci) =>
        ci.item.id + ci.size === id ? { ...ci, quantity: qty } : ci
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, ci) => {
    let price = ci.item.price;
    if (ci.size === "m" && ci.item.priceM) price = ci.item.priceM;
    if (ci.size === "l" && ci.item.priceL) price = ci.item.priceL;
    return sum + price * ci.quantity;
  }, 0);

  const itemCount = items.reduce((sum, ci) => sum + ci.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
