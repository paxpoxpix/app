
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchConversationHistory, selectConversationHistory, sendMessage } from '../features/conversations/conversationsSlice';

const ConversationPage: React.FC = () => {
  const dispatch = useDispatch();
  const { conversationId } = useParams<{ conversationId: string }>();
  const conversationHistory = useSelector(selectConversationHistory);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    dispatch(fetchConversationHistory(conversationId));
  }, [dispatch, conversationId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      await dispatch(sendMessage({ conversationId, content: messageInput }));
      setMessageInput('');
    }
  };

  return (
    <div className="conversation-container">
      <div className="conversation-history">
        {conversationHistory.map((message) => (
          <div key={message.id}>
            <strong>{message.sender === 'user' ? 'You' : 'AI'}:</strong> {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="conversation-input">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ConversationPage;

