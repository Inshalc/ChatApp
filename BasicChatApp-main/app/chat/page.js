'use client';

import { useState, useEffect } from 'react';
import ConversationList from "../../components/ConversationsList";
import MessageArea from '../../components/MessageArea';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(()=>{
    const checkSession = async()=> {
      try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      if (!response.ok || !data.user){
        router.replace("/login");
      } else {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      router.replace("/login");
      } 
    };
    checkSession();
  }, [router])

  const handleLogout = async () => {
    try {
      console.log('Logging out');
      await fetch('/api/auth/logout', { method: 'POST' });
      router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      router.replace('/login');
    }
  };

  if (!user) {
    // do nothing while checking session
    return null;
  }

 

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold">ChatApp</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </header>
      <div className="flex flex-1">
        <ConversationList
          userId={user.id}
          onSelectConversation={setSelectedConversation}
          selectedConversation={selectedConversation}
        />
        <MessageArea
          conversation={selectedConversation}
          userId={user.id}
        />
      </div>
    </div>
  );
}