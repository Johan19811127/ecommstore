// pages/login.js
import { useState } from 'react';
import { signIn, signInWithGoogle } from '../lib/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        
        <form onSubmit={handleLogin} className="mt-4 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Login
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.35 11.1H12v2.82h5.41a4.81 4.81 0 0 1-2.07 3.15v2.61h3.33c1.96-1.81 3.08-4.48 3.08-7.62 0-.6-.06-1.19-.18-1.76z" />
              <path d="M12 21c2.55 0 4.68-.85 6.24-2.3l-3.33-2.61c-.91.62-2.08 1-3.41 1a5.94 5.94 0 0 1-5.62-4H3v2.58A9.98 9.98 0 0 0 12 21z" />
              <path d="M6.38 12.92A5.93 5.93 0 0 1 6 10.5c0-.85.15-1.68.38-2.42V5.5H3A9.98 9.98 0 0 0 2 10.5c0 1.57.36 3.06 1 4.42l3.38-2.58z" />
              <path d="M12 4.46c1.4 0 2.66.48 3.65 1.42l2.7-2.7C16.68 2.18 14.55 1.5 12 1.5A9.98 9.98 0 0 0 3 5.5l3.38 2.58A5.92 5.92 0 0 1 12 4.46z" />
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
