import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBackendCheck = async (userData) => {
    try {
      const response = await fetch('/api/auth/checkUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to communicate with the backend');
      }

      const result = await response.json();
      console.log('User in MongoDB:', result);
      
    } catch (err) {
      console.error('Error checking/creating user:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const { displayName, email, photoURL, uid } = firebaseUser;

        // Check or create user in the backend
        handleBackendCheck({ displayName, email, photoURL, uid });

        setUser({ displayName, email, photoURL, uid });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}