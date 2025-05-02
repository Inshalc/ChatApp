'use client';

import { useState, useEffect } from 'react';
import { getUsers } from '../lib/users';

export default function MessageArea({ conversation, userId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!conversation) return;

    // Fetch messages for the selected conversation
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/chat/messages?conversationId=${conversation.id}`);
        const data = await response.json();
        if (response.ok) {
          setMessages(data.messages);
        } else {
          console.error('Error fetching messages:', data.message);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversation]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversation) return;

    try {
      const response = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: conversation.id,
          senderId: userId,
          content: newMessage,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, data.message]);
        setNewMessage('');
      } else {
        console.error('Error sending message:', data.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Get user names for display
  const users = getUsers();
  const getUserName = (userId) => users.find((u) => u.id === userId)?.name || 'Unknown';

  if (!conversation) {
    return (
      <div className="w-3/4 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a conversation to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="w-3/4 flex flex-col bg-gray-50">
      <div className="p-4 border-b bg-white">
        <h2 className="text-xl font-bold">
          Chat with {getUserName(conversation.otherParticipant)}
        </h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {loading ? (
          <p className="text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 flex ${
                msg.senderId === userId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs p-2 rounded-lg ${
                  msg.senderId === userId ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                <p className="text-sm font-semibold">{getUserName(msg.senderId)}</p>
                <p>{msg.content}</p>
                <p className="text-xs text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded-md"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}