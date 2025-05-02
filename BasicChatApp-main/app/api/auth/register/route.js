import { getUsers, addUser } from '../../../../lib/users';
import { redirect } from 'next/navigation';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Basic validation
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), {
        status: 400,
      });
    }

    // Check if user already exists
    const users = getUsers();
    if (users.find((user) => user.email === email)) {
      return new Response(JSON.stringify({ message: 'Email already registered' }), {
        status: 400,
      });
    }

    // Store user with hashed password
    await addUser({ name, email, password });

    // Redirect to login
    return new Response(JSON.stringify({ message: 'User registered successfully' }), {
      status: 201,
      headers: { 'Location': '/login' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}