
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'hungarian-bites-cart';

const loadCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCartFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (newItem: CartItem) => {
    setCartItems(prevItems => {
      const updated = prevItems.find(item => item.id === newItem.id)
        ? prevItems.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
        : [...prevItems, newItem];
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => {
      const updated = prevItems.filter(item => item.id !== id);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prevItems => {
      const updated = prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const value: CartContextType = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
