import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { baseUrl } from '../utils/constants';

// eslint-disable-next-line import/prefer-default-export
export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${baseUrl}car_models/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
  name: 'cars',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.data = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addDefaultCase((state, action) => {});
  },
});

export default autoServiceSlice.reducer;
