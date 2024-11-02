import { createContext, useContext, useState, useEffect } from 'react';

// Create CartContext
const CartContext = createContext();

// Hook to use the CartContext
export const useCart = () => useContext(CartContext);

// CartProvider to wrap around components needing access to cart
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from local storage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Sync cart state with local storage whenever the cart state changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart'); // Remove cart from localStorage if it's empty
    }
  }, [cart]);

  // Add an item to the cart based on item id only
  const addToCart = (product, item, quantity) => {
    setCart((prevCart) => {
      // Find an existing item by item id
      const existingItem = prevCart.find(
        (cartItem) => cartItem.item.id === item.id
      );

      if (existingItem) {
        // Update quantity of an existing item with the same item id
        return prevCart.map((cartItem) =>
          cartItem.item.id === item.id
            ? {
                ...cartItem,
                quantity: Number(cartItem.quantity) + Number(quantity), // Increment the quantity
              }
            : cartItem
        );
      } else {
        // Add new item to the cart
        return [...prevCart, { product, item, quantity: Number(quantity) }];
      }
    });
  };

  // Update the quantity of a specific item in the cart
  const updateCartItem = (itemId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity: Number(newQuantity) } // Ensure new quantity is a number
          : cartItem
      )
    );
  };

  // Remove an item from the cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) => cartItem.item.id !== itemId
      )
    );
  };

  // Clear the entire cart and remove from localStorage
  const clearCart = () => {
    setCart([]); // Clear the cart in state
    localStorage.removeItem('cart'); // Explicitly remove the cart from localStorage
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};