'use client';

import { useState, useEffect } from 'react';
import { getUsers } from '../lib/users';

export default function ConversationList({ userId, onSelectConversation, selectedConversation }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch conversations
    const fetchConversations = async () => {
      try {
        const response = await fetch(`/api/chat/conversations?userId=${userId}`);
        const data = await response.json();
        if (response.ok) {
          setConversations(data.conversations);
        } else {
          console.error('Error fetching conversations:', data.message);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [userId]);

  // Get user names for display
  const users = getUsers();
  const getUserName = (userId) => users.find((u) => u.id === userId)?.name || 'Unknown';

  if (loading) {
    return <div className="w-1/4 bg-white p-4 border-r">Loading conversations...</div>;
  }

  return (
    <div className="w-1/4 bg-white p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Conversations</h2>
      {conversations.length === 0 ? (
        <p className="text-gray-500">No conversations yet.</p>
      ) : (
        <ul className="space-y-2">
          {conversations.map((conv) => (
            <li
              key={conv.id}
              className={`p-2 rounded cursor-pointer ${
                selectedConversation?.id === conv.id ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
              onClick={() => onSelectConversation(conv)}
            >
              <p className="font-semibold">{getUserName(conv.otherParticipant)}</p>
              <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}