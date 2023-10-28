import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { baseUrl } from '../utils/constants';
import { TCar } from '../utils/types';

type TInitialState = {
  data: TCar[];
  status: null | string;
  error: undefined | string | null;
};

const initialState: TInitialState = {
  data: [],
  status: null,
  error: null,
};

export const fetchCars = createAsyncThunk<TCar[], undefined, { rejectValue: string }>(
  'cars/fetchCars',
  async function (_, { rejectWithValue }) {
    const response = await fetch(`${baseUrl}autoservice/car_models`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }
    const data = await response.json();

    return data;
  }
);

const autoServiceSlice = createSlice({
  name: 'cars',
  initialState,
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
      });
  },
  reducers: {},
});

export default autoServiceSlice.reducer;
