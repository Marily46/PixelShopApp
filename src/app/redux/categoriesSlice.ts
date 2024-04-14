import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from '../../services';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await getCategories();
      return categories;
    } catch (error) { 
      let errorMessage = 'Error fetching categories';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        return action.payload;
      });

  },
});

export default categoriesSlice.reducer;