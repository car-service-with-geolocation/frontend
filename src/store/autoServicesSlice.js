import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const fetchAutoServices = createAsyncThunk(
  'autoService/fetchAutoServices',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Server Error');
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const autoServiceSlice = createSlice({
  name: 'autoService',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: {
    [fetchAutoServices.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchAutoServices.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload;
    },
    [fetchAutoServices.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default autoServiceSlice.reducer;
