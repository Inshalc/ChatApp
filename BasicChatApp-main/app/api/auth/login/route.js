import {verifyPassword} from "../../../../lib/users";
import { cookies } from "next/headers";

export async function POST(request) {

  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email and password are required' }), {
        status: 400,
      });
    }

    // verify user credentials
    const user = await verifyPassword(email, password);

    // Find user
    

    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
        status: 401,
      });
    }

    const cookieStore = cookies();
    (await cookieStore).set("session", JSON.stringify({id:user.id, name:user.name, email: user.email}),{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24*60*60, // i.e., 24 hours max
      path: "/",
    });

    // Return user data including name and ID
    return new Response(JSON.stringify({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}