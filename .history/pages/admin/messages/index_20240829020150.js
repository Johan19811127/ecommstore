// pages/admin.js
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import useAuth from '@/lib/useAuth';
import MessageBox from '@/components/MessageBox';


export default function Admin() {
  const { user } = useAuth();

 

  if (!user || user.email !== 'admin@example.com') {
    return <div>You do not have access to this page.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <MessageBox userId="admin" recipientId="user" />
    </div>
  )
}