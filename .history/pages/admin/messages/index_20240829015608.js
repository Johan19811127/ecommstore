// pages/admin.js
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import useAuth from '@/lib/useAuth';
import MessageBox from '@/components/MessageBox';


export default function Admin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user || user.email !== 'admin@example.com') {
    return <div>You do not have access to this page.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <MessageBox userId={user.uid} recipientId="user" />
    </div>
  )
}