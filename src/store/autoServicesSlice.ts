import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { baseUrl } from '../utils/constants';
import { TService } from '../utils/types';

type TInitialState = {
  data: TService[];
  status: null | string;
  error: undefined | string | null;
};

const initialState: TInitialState = {
  data: [],
  status: null,
  error: null,
};

export const fetchAutoServices = createAsyncThunk<
  TService[],
  undefined,
  { rejectValue: string }
  // eslint-disable-next-line func-names
>('autoService/fetchAutoServices', async function (_, { rejectWithValue }) {
  const response = await fetch(`${baseUrl}autoservice/service/`, {
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
});

const autoServiceSlice = createSlice({
  name: 'autoService',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAutoServices.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAutoServices.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.data = action.payload;
      })
      .addCase(fetchAutoServices.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
  reducers: {},
});

export default autoServiceSlice.reducer;
