// components/MessageBox.js
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export default function MessageBox({ userId, recipientId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineStatus, setOnlineStatus] = useState(false);

  useEffect(() => {
    // Fetch initial messages
    fetch(`/api/messages?sender=${userId}&recipient=${recipientId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages(data.data);
          // Mark unread messages as read
          data.data.forEach((message) => {
            if (!message.read && message.recipient === userId) {
              markAsRead(message._id);
            }
          });
        }
      });

    // Listen for new messages
    socket.on('receiveMessage', (message) => {
      if (
        (message.sender === userId && message.recipient === recipientId) ||
        (message.sender === recipientId && message.recipient === userId)
      ) {
        setMessages((prev) => [...prev, message]);
        if (message.recipient === userId) {
          markAsRead(message._id);
        }
      }
    });

    

    // Listen for user status updates
    socket.on('userStatusUpdate', (status) => {
      if (status.userId === recipientId) {
        setOnlineStatus(status.online);
      }
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('userStatusUpdate');
    };
  }, [userId, recipientId]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      sender: userId,
      recipient: recipientId,
      content: newMessage,
    };

    socket.emit('sendMessage', messageData);
    setNewMessage('');
  };

  const markAsRead = (messageId) => {
    fetch(`/api/messages/read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messageId }),
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Chat with {recipientId}</h2>
        <span className={`text-sm ${onlineStatus ? 'text-green-500' : 'text-red-500'}`}>
          {onlineStatus ? 'Online' : 'Offline'}
        </span>
      </div>
      <div className="h-64 overflow-y-scroll">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === userId ? 'text-right' : ''}`}>
            <p
              className={`p-2 rounded ${
                message.sender === userId ? 'bg-blue-200' : 'bg-gray-200'
              }`}
            >
              {message.content}
            </p>
            <span className="text-xs text-gray-500">
              {message.read ? 'Read' : 'Unread'}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="w-full mt-2 bg-blue-500 text-white py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
