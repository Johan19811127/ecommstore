// lib/auth.js
import { auth , googleProvider } from '.firebase./firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,  signInWithPopup} from 'firebase/auth';

// Sign up a new user
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in an existing user
export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

// Sign out the current user
export const logOut = () => {
  return signOut(auth);
};
