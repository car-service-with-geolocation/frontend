import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { baseUrl } from '../utils/constants';
import { TService } from '../utils/types';

type TInitialState = {
  data: TService | null;
  status: null | string;
  error: undefined | string | null;
};

const initialState: TInitialState = {
  data: null,
  status: null,
  error: null,
};

export const fetchAutoServiceId = createAsyncThunk<
  TService,
  string,
  { rejectValue: string }
>('autoServiceId/fetchAutoServiceId', async function (id, { rejectWithValue }) {
  const response = await fetch(`${baseUrl}autoservice/service/${id}`);
  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }
  const data = await response.json();

  return data;
});

const autoServiceSliceId = createSlice({
  name: 'autoServiceId',
  initialState,
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
      });
  },
  reducers: {},
});

export default autoServiceSliceId.reducer;
