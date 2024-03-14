
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { ConversationResponse, MessageResponse } from '../../../shared/types';

interface ConversationsState {
  conversationId: string | null;
  conversationHistory: MessageResponse[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ConversationsState = {
  conversationId: null,
  conversationHistory: [],
  status: 'idle',
  error: null,
};

export const startConversation = createAsyncThunk(
  'conversations/startConversation',
  async (characterId: string) => {
    const response = await axios.post<ConversationResponse>('/api/conversations', { characterId });
    return response.data.id;
  }
);

export const fetchConversationHistory = createAsyncThunk(
  'conversations/fetchConversationHistory',
  async (conversationId: string) => {
    const response = await axios.get<MessageResponse[]>(`/api/conversations/${conversationId}`);
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
  'conversations/sendMessage',
  async ({ conversationId, content }: { conversationId: string; content: string }) => {
    const response = await axios.post<{ userMessage: MessageResponse; aiMessage: MessageResponse }>(
      `/api/conversations/${conversationId}/messages`,
      { content }
    );
    return response.data;
  }
);

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startConversation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(startConversation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conversationId = action.payload;
      })
      .addCase(startConversation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to start conversation';
      })
      .addCase(fetchConversationHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConversationHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conversationHistory = action.payload;
      })
      .addCase(fetchConversationHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch conversation history';
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conversationHistory.push(action.payload.userMessage);
        state.conversationHistory.push(action.payload.aiMessage);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to send message';
      });
  },
});

export const selectConversationHistory = (state: RootState) => state.conversation.conversationHistory;

export default conversationsSlice.reducer;

