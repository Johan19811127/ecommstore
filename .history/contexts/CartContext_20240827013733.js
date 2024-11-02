// contexts/CartContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { db } from '@/firebase'; // Firebase or your database setup
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'; // Firestore example
import useAuth from '@/lib/useAuth';
import { useRouter } from 'next/router';


const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
    const router
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchCart = async () => {
        const cartRef = doc(db, 'carts', currentUser.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setCartItems(cartSnap.data().items || []);
        }
      };
      fetchCart();
    }
  }, [currentUser]);

  const addItemToCart = async (item) => {
    if (!currentUser) {
      console.error('User not logged in');
      return;
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id && i.size === item.size);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevItems, item];
    });

    const cartRef = doc(db, 'carts', currentUser.uid);
    await updateDoc(cartRef, {
      items: arrayUnion(item),
    });
  };

  const removeItemFromCart = async (id, size) => {
    if (!currentUser) {
      console.error('User not logged in');
      return;
    }

    const updatedItems = cartItems.filter((i) => i.id !== id || i.size !== size);
    setCartItems(updatedItems);

    const cartRef = doc(db, 'carts', currentUser.uid);
    await updateDoc(cartRef, {
      items: arrayRemove({ id, size }), // This requires that the full item is removed, consider another approach if necessary
    });
  };

  const updateItemQuantity = async (id, size, quantity) => {
    if (!currentUser) {
      console.error('User not logged in');
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      )
    );

    const cartRef = doc(db, 'carts', currentUser.uid);
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      const items = cartSnap.data().items;
      const updatedItems = items.map((i) =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      );
      await setDoc(cartRef, { items: updatedItems });
    }
  };

  const clearCart = async () => {
    if (!currentUser) {
      console.error('User not logged in');
      return;
    }

    setCartItems([]);
    const cartRef = doc(db, 'carts', currentUser.uid);
    await setDoc(cartRef, { items: [] });
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, updateItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
