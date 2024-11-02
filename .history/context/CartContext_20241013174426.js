import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Provide a hook to use the CartContext
export const useCart = () => useContext(CartContext);

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from local storage if available
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Save cart to local storage when cart state changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Function to add item to the cart
  const addToCart = (product, quantity = 1) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If the product already exists in the cart, update its quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // If the product is not in the cart, add it
      setCart((prevCart) => [...prevCart, { ...product, quantity }]);
    }
  };

  // Function to remove item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

