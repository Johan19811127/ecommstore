// pages/login.js
import { useState } from 'react';
import { signIn, signInWithGoogle } from '../../lib/auth';
import { FcGoogle } from "react-icons/fc";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useRouter();

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
    if (user) {
      // Check or create user in MongoDB
      const { displayName, email, photoURL, uid } = user;
      handleBackendCheck({ displayName, email, photoURL, uid });

      // Navigate back to the previous screen
      navigation.goBack();
    }
  }, [user, navigation]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      // Redirect or do something after login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      // Redirect or do something after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Image src="/badge.png" alt="School badge" width="140" height="140" className="w-13 h-13  mb-5 mx-auto"></Image>
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        
        <form onSubmit={handleLogin} className="mt-4 space-y-2">
          <div>
      
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border font-semibold  border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder:text-slate-600"
            />
          </div>

          <div>
       
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mb-3 border font-semibold  border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder:text-slate-600"
            />
          </div>


          <button
            type="submit"
            className="w-full px-4 py-2 text-white mt-4 bg-blue-500 border-b font-semibold border-b-blue-700 shadow-md rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Login with Email
          </button>
          <div className="mt-1">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center mb-3 shadow-md text-md border-b border-b-gray-300 justify-center px-4 py-2 font-semibold text-slate-900 bg-gray-200 rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
           <FcGoogle className="h-6 w-6 mr-3 "></FcGoogle>
            Login with Google
          </button>

          
          {error && (
            <p className="text-sm text-center font-semibold text-red-500">{error}</p>
          )}
        </div>


        <Link href="/" className="text-sm text-center font-semibold text-gray-700 mt-7  mx-auto">To Register a new account - Click Here</Link>
        </form>

      
      </div>
    </div>
  );
}
