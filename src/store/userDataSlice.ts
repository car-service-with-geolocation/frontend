import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { baseUrl } from '../utils/constants';
import { TUserData } from '../utils/types';

type TInitialState = {
  data: null | TUserData;
  status: null | string;
  error: undefined | string | null;
};

const initialState: TInitialState = {
  data: null,
  status: null,
  error: null,
};

export const fetchUserData = createAsyncThunk<
  TUserData[],
  undefined,
  { rejectValue: string }
>('UserData/fetchUserData', async function (_, { rejectWithValue }) {
  const response = await fetch(`${baseUrl}UserData_models/`, {
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

const userDataSlice = createSlice({
  name: 'UserData',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
  reducers: {},
});

export default userDataSlice.reducer;
