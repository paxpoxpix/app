
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import charactersReducer from '../features/characters/charactersSlice';
import conversationsReducer from '../features/conversations/conversationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    characters: charactersReducer,
    conversation: conversationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

