// In-memory chat storage (replace with a database in production)
const conversations = [
    {
      id: '1',
      participants: ['1', '2'], // Shan and Shaider
      lastMessage: 'Hi Haider!',
      lastUpdated: new Date().toISOString(),
    },
  ];
  
  const messages = [
    {
      id: '1',
      conversationId: '1',
      senderId: '1', // shan
      content: 'Hi Haider!',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      conversationId: '1',
      senderId: '2', // Haider
      content: 'Hey Shan, how’s it going?',
      timestamp: new Date().toISOString(),
    },
  ];
  
  export function getConversations(userId) {
    return conversations
      .filter((conv) => conv.participants.includes(userId))
      .map((conv) => ({
        ...conv,
        otherParticipant: conv.participants.find((id) => id !== userId),
      }));
  }
  
  export function getMessages(conversationId) {
    return messages.filter((msg) => msg.conversationId === conversationId);
  }
  
  export function addMessage(conversationId, senderId, content) {
    const newMessage = {
      id: String(messages.length + 1),
      conversationId,
      senderId,
      content,
      timestamp: new Date().toISOString(),
    };
    messages.push(newMessage);
  
    // Update conversation's last message and timestamp
    const conversation = conversations.find((conv) => conv.id === conversationId);
    if (conversation) {
      conversation.lastMessage = content;
      conversation.lastUpdated = newMessage.timestamp;
    }
  
    return newMessage;
  }