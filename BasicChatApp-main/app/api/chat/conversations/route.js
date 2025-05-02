import { getConversations } from "../../../../lib/chat"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new Response(JSON.stringify({ message: 'User ID is required' }), {
        status: 400,
      });
    }

    const conversations = getConversations(userId);
    return new Response(JSON.stringify({ conversations }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}