import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { baseUrl } from '../utils/constants';

// eslint-disable-next-line import/prefer-default-export
export const fetchAutoServiceByCoord = createAsyncThunk(
  'autoServiceByCoord/fetchAutoServiceByCoord',
  async function (coord, { rejectWithValue }) {
    try {
      const response = await fetch(
        `${baseUrl}autoservice/service/?latitude=${coord.lat}&longitude=${coord.lon}`
      );
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

const autoServiceByCoordSlice = createSlice({
  name: 'autoServiceByCoord',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAutoServiceByCoord.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAutoServiceByCoord.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.data = action.payload;
      })
      .addCase(fetchAutoServiceByCoord.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addDefaultCase((state, action) => {});
  },
});

export default autoServiceByCoordSlice.reducer;
