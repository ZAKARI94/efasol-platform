import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const addItem = (product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
      }
      return [...current, { ...product, quantity }];
    });
    setOpen(true);
  };

  const updateQuantity = (productId, quantity) => {
    setItems((current) => current.map((item) => (item.id === productId ? { ...item, quantity } : item)).filter((item) => item.quantity > 0));
  };

  const removeItem = (productId) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  };

  const clear = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const total = subtotal + 1000;

  return (
    <CartContext.Provider value={{ items, open, setOpen, addItem, updateQuantity, removeItem, clear, subtotal, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
