import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { baseUrl } from '../utils/constants';
import { TService } from '../utils/types';

type TInitialState = {
  data: TService[];
  status: null | string;
  error: undefined | string | null;
};

type TCoord = {
  lat: string;
  lon: string;
};

const initialState: TInitialState = {
  data: [],
  status: null,
  error: null,
};

export const fetchAutoServiceByCoord = createAsyncThunk<
  TService[],
  TCoord,
  { rejectValue: string }
>(
  'autoServiceByCoord/fetchAutoServiceByCoord',
  async function (coord, { rejectWithValue }) {
    const response = await fetch(
      `${baseUrl}autoservice/service/?latitude=${coord.lat}&longitude=${coord.lon}`
    );
    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }
    const data = await response.json();

    return data;
  }
);

const autoServiceByCoordSlice = createSlice({
  name: 'autoServiceByCoord',
  initialState,
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
      });
  },
  reducers: {},
});

export default autoServiceByCoordSlice.reducer;
