import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const fetchAutoServiceId = createAsyncThunk(
  'autoServiceId/fetchAutoServiceId',
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
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

const autoServiceSliceId = createSlice({
  name: 'autoServiceId',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: {
    [fetchAutoServiceId.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchAutoServiceId.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload;
    },
    [fetchAutoServiceId.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default autoServiceSliceId.reducer;
