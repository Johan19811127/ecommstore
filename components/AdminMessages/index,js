import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export default function AdminMessages() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineStatus, setOnlineStatus] = useState({});

  useEffect(() => {
    // Fetch users who have sent messages to the admin
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.data);
        }
      });

    // Listen for online status updates
    socket.on('userStatusUpdate', (status) => {
      setOnlineStatus((prev) => ({ ...prev, [status.userId]: status.online }));
    });

    // Cleanup on component unmount
    return () => {
      socket.off('userStatusUpdate');
    };
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Fetch messages for the selected user
      fetch(`/api/messages?sender=${selectedUser._id}&recipient=admin`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMessages(data.data);
            // Mark unread messages as read
            data.data.forEach((message) => {
              if (!message.read && message.recipient === 'admin') {
                markAsRead(message._id);
              }
            });
          }
        });
    }
  }, [selectedUser]);

  const sendMessage = () => {
    if (newMessage.trim() === '' || !selectedUser) return;

    const messageData = {
      sender: 'admin',
      recipient: selectedUser._id,
      content: newMessage,
    };

    socket.emit('sendMessage', messageData);
    setMessages((prev) => [...prev, messageData]);
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
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-1/4 bg-white p-4 shadow-md">
        <h2 className="text-lg font-bold mb-4">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              className={`p-2 mb-2 cursor-pointer rounded ${
                selectedUser && selectedUser._id === user._id
                  ? 'bg-blue-200'
                  : 'bg-gray-200'
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex justify-between items-center">
                <span>{user.user.name || user._id}</span>
                <span
                  className={`text-sm ${
                    onlineStatus[user._id] ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {onlineStatus[user._id] ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Last message: {user.lastMessage.content}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 bg-white p-4 shadow-md">
        {selectedUser ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Chat with {selectedUser.user.name || selectedUser._id}</h2>
              <span className={`text-sm ${onlineStatus[selectedUser._id] ? 'text-green-500' : 'text-red-500'}`}>
                {onlineStatus[selectedUser._id] ? 'Online' : 'Offline'}
              </span>
            </div>
            <div className="h-64 overflow-y-scroll">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    message.sender === 'admin' ? 'text-right' : ''
                  }`}
                >
                  <p
                    className={`p-2 rounded ${
                      message.sender === 'admin'
                        ? 'bg-blue-200'
                        : 'bg-gray-200'
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
          </>
        ) : (
          <div>Select a user to start a conversation</div>
        )}
      </div>
    </div>
  );
}