import { createContext, useContext, useState, useEffect } from 'react';

// Create CartContext
const CartContext = createContext();

// Hook to use the CartContext
export const useCart = () => useContext(CartContext);

// CartProvider to wrap around components needing access to cart
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from local storage once when the component mounts
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    // Save cart to local storage whenever the cart state changes
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product, item, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (cartItem) => cartItem.product.id === product.id && cartItem.item.id === item.id
      );

      if (existingProduct) {
        // Update the quantity of an existing product
        return prevCart.map((cartItem) =>
          cartItem.product.id === product.id && cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        // Add the new product to the cart
        return [...prevCart, { product, item, quantity }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

