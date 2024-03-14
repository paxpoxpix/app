
export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Character {
  id: string;
  name: string;
  description: string;
}

export interface Conversation {
  id: string;
  userId: string;
  characterId: string;
  timestamp: number;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: number;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface StartConversationRequest {
  characterId: string;
}

export interface SendMessageRequest {
  content: string;
}

export interface ConversationResponse {
  id: string;
  characterId: string;
  timestamp: number;
}

export interface MessageResponse {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: number;
}
