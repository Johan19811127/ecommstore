import { useState, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user) {
          const { displayName, email, photoURL, uid } = user;
          handleBackendCheck({ displayName, email, photoURL, uid });
    
          // Navigate back to the previous screen
          navigation.goBack();
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