import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const fetchAutoServiceByCoord = createAsyncThunk(
  'autoServiceByCoord/fetchAutoServiceByCoord',
  async function (coord, { rejectWithValue }) {
    try {
      const response = await fetch(
        `http://80.87.107.183/api/v1/autoservice/service/?latitude=${coord.lat}longitude=${coord.lon}`
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
  extraReducers: {
    [fetchAutoServiceByCoord.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchAutoServiceByCoord.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload;
    },
    [fetchAutoServiceByCoord.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default autoServiceByCoordSlice.reducer;
