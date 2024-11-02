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

  // Save cart to local storage whenever the cart state changes
  useEffect(() => {
      if (cart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        localStorage.removeItem('cart'); // Clear localStorage if the cart is empty
      }
    }, [cart]);

  // Add a product and item to the cart
  const addToCart = (product, item, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (cartItem) => cartItem.item.id === item.id
      );
  
      if (existingProduct) {
        // Convert both existing quantity and added quantity to numbers before adding
        return prevCart.map((cartItem) =>
           cartItem.item.id === item.id
            ? {
                ...cartItem,
                quantity: Number(cartItem.quantity) + Number(quantity), // Ensure numeric addition
              }
            : cartItem
        );
      } else {
        // Add new product to the cart, ensuring the quantity is a number
        return [...prevCart, { product, item, quantity: Number(quantity) }];
      }
    });
  };

  // Update the quantity of a specific item in the cart
  const updateCartItem = (productId, itemId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };

  // Remove an item from the cart
  const removeFromCart = (productId, itemId) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) => !(cartItem.item.id === itemId)
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    console.log('Clearing the cart');
    setCart([]); // Clear the cart state
    localStorage.removeItem('cart'); // Remove cart from localStorage
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};