// pages/login.js
import { useEffect, useState } from 'react';
import { signIn, signInWithGoogle } from '../lib/auth';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      // Navigate back to the previous screen when user logs in
      navigation.goBack();
    }
  }, [user, navigation]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password); // This triggers user state update in AuthContext
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle(); // This triggers user state update in AuthContext
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      
      <div>
        <button onClick={handleGoogleLogin}>
          Login with Google
        </button>
      </div>
    </div>
  );
}