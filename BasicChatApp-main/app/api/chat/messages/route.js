import { getMessages, addMessage } from "../../../../lib/chat"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) {
      return new Response(JSON.stringify({ message: 'Conversation ID is required' }), {
        status: 400,
      });
    }

    const messages = getMessages(conversationId);
    return new Response(JSON.stringify({ messages }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const { conversationId, senderId, content } = await request.json();

    if (!conversationId || !senderId || !content) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), {
        status: 400,
      });
    }

    const message = addMessage(conversationId, senderId, content);
    return new Response(JSON.stringify({ message }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}