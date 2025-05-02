import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Clear session cookie
    const cookieStore = cookies();
    cookieStore.delete('session');

    return new Response(JSON.stringify({ message: 'Logout successful' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}