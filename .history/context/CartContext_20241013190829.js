import { createContext, useContext, useState, useEffect } from 'react';

// Create CartContext
const CartContext = createContext();

// Hook to use the CartContext
export const useCart = () => useContext(CartContext);

// CartProvider to wrap around components needing access to cart
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Add to cart function that accepts product, item, and quantity
  const addToCart = (product, item, quantity) => {
    const existingProduct = cart.find(
      (cartItem) => cartItem.product.id === product.id && cartItem.item.id === item.id
    );

    if (existingProduct) {
      // If the product with the same item (e.g., size) already exists, update its quantity
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.product.id === product.id && cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      );
    } else {
      // If the product with this specific item is not in the cart, add it
      setCart((prevCart) => [
        ...prevCart,
        { product, item, quantity },
      ]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

