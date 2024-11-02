
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from '../../learn/schoolstore/lib/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, get additional details if necessary
        const { displayName, email, photoURL, uid } = user;
        setUser({ displayName, email, photoURL, uid });
        writeUserDetailsToFirestore({ displayName, email, photoURL, uid });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const writeUserDetailsToFirestore = async (user) => {
    try {
      const userDocRef = firestore.collection('users').doc(user.email);
      const docSnapshot = await userDocRef.get();

      if (!docSnapshot.exists) {
        await userDocRef.set({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          createdAt: new Date()
        });
        console.log('Document created with ID: ', user.email);
      } else {
        console.log('Document with this email already exists.');
      }
    } catch (error) {
      console.error('Error writing user details to Firestore: ', error);
    }
  };


  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}