import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../services';


interface UserState {
    token: string | null;
    status: 'idle' | 'loading' | 'failed';
  }
  
  const initialState: UserState = {
    token: null,
    status: 'idle',
  };
  
  // async thunk for login
  export const loginUser = createAsyncThunk(
    'user/login',
    async ({ username, password }: { username: string; password: string }) => {
      const response = await login(username, password);
      return response.token;
    }
  );
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logoutUser: (state) => {
        state.token = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.token = action.payload;
          state.status = 'idle';
        })
        .addCase(loginUser.rejected, (state) => {
          state.status = 'failed';
        });
    },
  });
  
  export const { logoutUser } = userSlice.actions;
  
  export default userSlice.reducer;