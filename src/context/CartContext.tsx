
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  addToCartAndOpen: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  undoRemove: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
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

const isValidCartItem = (item: unknown): item is CartItem => {
  if (typeof item !== 'object' || item === null) return false;
  const obj = item as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.price === 'number' &&
    !isNaN(obj.price) &&
    typeof obj.quantity === 'number' &&
    !isNaN(obj.quantity) &&
    obj.quantity > 0 &&
    typeof obj.image === 'string'
  );
};

const loadCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as unknown[];
    return parsed.filter(isValidCartItem);
  } catch {
    return [];
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCartFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const lastRemovedItemRef = React.useRef<CartItem | null>(null);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) {
        setCartItems(loadCartFromStorage());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const persistCart = (updated: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
  };

  const addToCart = (newItem: CartItem) => {
    setCartItems(prevItems => {
      const updated = prevItems.find(item => item.id === newItem.id)
        ? prevItems.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
        : [...prevItems, newItem];
      persistCart(updated);
      return updated;
    });
  };

  const addToCartAndOpen = (newItem: CartItem) => {
    setCartItems(prevItems => {
      const updated = prevItems.find(item => item.id === newItem.id)
        ? prevItems.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
        : [...prevItems, newItem];
      persistCart(updated);
      return updated;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => {
      const removedItem = prevItems.find(item => item.id === id);
      if (removedItem) {
        lastRemovedItemRef.current = removedItem;
      }
      const updated = prevItems.filter(item => item.id !== id);
      persistCart(updated);
      return updated;
    });
  };

  const undoRemove = () => {
    if (lastRemovedItemRef.current) {
      const item = lastRemovedItemRef.current;
      setCartItems(prevItems => {
        const existing = prevItems.find(i => i.id === item.id);
        if (existing) {
          const updated = prevItems.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          );
          persistCart(updated);
          return updated;
        }
        const updated = [...prevItems, item];
        persistCart(updated);
        return updated;
      });
      lastRemovedItemRef.current = null;
    }
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
      persistCart(updated);
      return updated;
    });
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const value: CartContextType = {
    cartItems,
    isCartOpen,
    addToCart,
    addToCartAndOpen,
    removeFromCart,
    undoRemove,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
