import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { baseUrl } from '../utils/constants';

// eslint-disable-next-line import/prefer-default-export
export const fetchAutoServiceId = createAsyncThunk(
  'autoServiceId/fetchAutoServiceId',
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(`${baseUrl}autoservice/service/${id}`);
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
    data: null,
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAutoServiceId.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAutoServiceId.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.data = action.payload;
      })
      .addCase(fetchAutoServiceId.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addDefaultCase((state, action) => {});
  },
});

export default autoServiceSliceId.reducer;
