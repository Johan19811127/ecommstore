import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  // Use the context directly to get `user` and `loading`
  const { user, loading } = useContext(AuthContext);

  return { user, loading };
};

export default useAuth;