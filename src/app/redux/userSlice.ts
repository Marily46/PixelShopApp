import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../services';

// Define a type for the slice state
interface UserState {
    token: string | null;
    status: 'idle' | 'loading' | 'failed';
  }
  
  // Define the initial state using that type
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
  
  // Define a slice with the initial state, reducers, and extra reducers
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