// components/MessageBox.js
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export default function MessageBox({ userId, recipientId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetch(`/api/messages?sender=${userId}&recipient=${recipientId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages(data.data);
        }
      });

    socket.on('receiveMessage', (message) => {
      if (
        (message.sender === userId && message.recipient === recipientId) ||
        (message.sender === recipientId && message.recipient === userId)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => socket.off('receiveMessage');
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

  return (
    <div className="max-w-md mx-auto bg-white p-4 shadow-md rounded-lg">
      <div className="h-64 overflow-y-scroll">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === userId ? 'text-right' : ''}`}>
            <p className="p-2 bg-gray-200 rounded">{message.content}</p>
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
