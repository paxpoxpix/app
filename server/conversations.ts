
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StartConversationRequest, ConversationResponse, SendMessageRequest, MessageResponse } from '../shared/types';
import { generateAIResponse } from './openai';

export async function startConversation(db: any, req: Request, res: Response) {
  const { characterId } = req.body as StartConversationRequest;
  const userId = req.params.userId;

  try {
    const conversationId = uuidv4();
    const timestamp = Date.now();

    await db.run('INSERT INTO conversations (id, userId, characterId, timestamp) VALUES (?, ?, ?, ?)', [
      conversationId,
      userId,
      characterId,
      timestamp,
    ]);

    const response: ConversationResponse = {
      id: conversationId,
      characterId,
      timestamp,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error starting conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getConversationHistory(db: any, req: Request, res: Response) {
  const conversationId = req.params.conversationId;

  try {
    const messages = await db.all('SELECT * FROM messages WHERE conversationId = ? ORDER BY timestamp', conversationId);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving conversation history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function sendMessage(db: any, req: Request, res: Response) {
  const conversationId = req.params.conversationId;
  const { content } = req.body as SendMessageRequest;

  try {
    const messageId = uuidv4();
    const timestamp = Date.now();

    await db.run('INSERT INTO messages (id, conversationId, sender, content, timestamp) VALUES (?, ?, ?, ?, ?)', [
      messageId,
      conversationId,
      'user',
      content,
      timestamp,
    ]);

    const userMessage: MessageResponse = {
      id: messageId,
      sender: 'user',
      content,
      timestamp,
    };

    // Generate AI response
    const aiResponse = await generateAIResponse(content);

    const aiMessageId = uuidv4();
    const aiTimestamp = Date.now();

    await db.run('INSERT INTO messages (id, conversationId, sender, content, timestamp) VALUES (?, ?, ?, ?, ?)', [
      aiMessageId,
      conversationId,
      'ai',
      aiResponse,
      aiTimestamp,
    ]);

    const aiMessage: MessageResponse = {
      id: aiMessageId,
      sender: 'ai',
      content: aiResponse,
      timestamp: aiTimestamp,
    };

    res.status(200).json({ userMessage, aiMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

