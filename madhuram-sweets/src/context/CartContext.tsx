"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { products, weightPrices } from "@/lib/data";

export interface CartItem {
  product: typeof products[0];
  quantity: number;
  weight: string;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: number;
  deliveryDate?: string;
  expectedDelivery?: string;
  address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: typeof products[0], weight: string) => void;
  updateQuantity: (productId: number, weight: string, delta: number) => void;
  removeItem: (productId: number, weight: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  orders: Order[];
  addOrder: (order: Order) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getInitialCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const savedCart = localStorage.getItem("madhuram-cart");
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch {
      return [];
    }
  }
  return [];
}

function getInitialOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const savedOrders = localStorage.getItem("madhuram-orders");
  if (savedOrders) {
    try {
      return JSON.parse(savedOrders);
    } catch {
      return [];
    }
  }
  return [];
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => getInitialCart());
  const [orders, setOrders] = useState<Order[]>(() => getInitialOrders());

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("madhuram-cart", JSON.stringify(cart));
  }, [cart]);

  // Save orders to localStorage on change
  useEffect(() => {
    localStorage.setItem("madhuram-orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = useCallback((product: typeof products[0], weight: string) => {
    const price = weightPrices[product.id]?.[weight] || product.price;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.weight === weight);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.weight === weight
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, weight, price }];
    });
  }, []);

  const updateQuantity = useCallback((productId: number, weight: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.weight === weight
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((productId: number, weight: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.weight === weight)));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        cartTotal,
        cartCount,
        orders,
        addOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
