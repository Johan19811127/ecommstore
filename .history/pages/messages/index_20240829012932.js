import React from 'react';
import useAuth from '@/lib/useAuth';
 // Assuming you have a useAuth hook for Firebase authentication
import MessageBox from '@/components/MessageBox';

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