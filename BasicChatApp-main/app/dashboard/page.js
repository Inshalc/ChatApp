'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        if (!response.ok || !data.user) {
          console.log('No session found, redirecting to /login');
          router.replace('/login');
        } else {
          setUserName(data.user.name);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        router.replace('/login');
      }
    };
    checkSession();
  }, [router]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, {userName}!</h1>
        <p className="text-gray-600 mb-6">You are now logged in.</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}