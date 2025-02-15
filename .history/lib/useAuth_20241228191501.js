import { useState, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const useAuth = () => {
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
     
        if (user) {
          const { displayName, email, photoURL, uid } = user;
          handleBackendCheck({ displayName, email, photoURL, uid });
    
          // Navigate back to the previous screen
          navigation.back();
        }
  
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;