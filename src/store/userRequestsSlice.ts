import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { baseUrl } from '../utils/constants';
import { TUserRequestData } from '../utils/types';

const initialState: {
  data: TUserRequestData[];
  status: string | null;
  error: undefined | string | null;
} = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchUserRequestsData = createAsyncThunk<
  TUserRequestData[],
  undefined,
  { rejectValue: string }
>('user/fetchRequestsData', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('JWT');
  const response = await fetch(`${baseUrl}orders/`, {
    method: 'GET',
    headers: {
      authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }
  const data = await response.json();
  return data;
});

const userRequestsSlice = createSlice({
  name: 'userRequests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRequestsData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserRequestsData.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.data = action.payload;
      })
      .addCase(fetchUserRequestsData.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

// export const selectUserRequests = createSelector(
//   [(state: RootState) => state.userRequests.data, (state: RootState) => state.auth.id],
//   (requests, userId) => requests.filter((req) => req.owner === userId)
// );

export default userRequestsSlice.reducer;
