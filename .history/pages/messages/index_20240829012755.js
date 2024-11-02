import React from 'react';
import MessageBox from '../components/MessageBox';
import { useAuth } from '../utils/auth'; // Assuming you have a useAuth hook for Firebase authentication

const Messages = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to view your messages.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <MessageBox userId={user.uid} recipientId="admin" />
    </div>
  );
};

export default Messages;