import { cookies } from 'next/headers';
import { getUsers } from '../../../../lib/users';

export async function GET() {
    try {
      const cookieStore = cookies();
      const session = cookieStore.get('session')?.value;
  
      if (!session) {
        return new Response(JSON.stringify({ message: 'No session found' }), {
          status: 401,
        });
      }
  
      const user = JSON.parse(session);
      const users = getUsers();
      const validUser = users.find((u) => u.id === user.id && u.email === user.email);
  
      if (!validUser) {
        return new Response(JSON.stringify({ message: 'Invalid session' }), {
          status: 401,
        });
      }
  
      return new Response(JSON.stringify({ user: { id: validUser.id, name: validUser.name, email: validUser.email } }), {
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Server error' }), {
        status: 500,
      });
    }
  }