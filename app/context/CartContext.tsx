import { createContext, useContext, useState } from 'react';
import { ProductDTO } from '@/api/types';

export type CartItem = {
  product: ProductDTO;
  quantityGrams: number; // total grams of this product
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: ProductDTO, quantityGrams: number) => void;
  decreaseQuantity: (productId: number, grams: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: ProductDTO, quantityGrams: number) => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.product.id === product.id);

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          quantityGrams: updated[index].quantityGrams + quantityGrams,
        };
        return updated;
      }

      return [...prev, { product, quantityGrams }];
    });
  };

  const decreaseQuantity = (productId: number, grams: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantityGrams - grams;
            if (newQty > 0) {
              return { ...item, quantityGrams: newQty };
            } else {
              return null; // mark for removal
            }
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
