import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { LoginRequest, RegisterRequest } from '../../../shared/types';

interface AuthState {
  userId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  userId: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest) => {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data.userId;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterRequest) => {
    await axios.post('/api/auth/register', credentials);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userId = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Registration failed';
      });
  },
});

export const authReducer = authSlice.reducer;
export const { login, register } = authSlice.actions;
export const selectUserId = (state: RootState) => state.auth.userId;
