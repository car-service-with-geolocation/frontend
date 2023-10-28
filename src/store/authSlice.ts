import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { baseUrl } from '../utils/constants';

type TInitialState = {
  email?: null | string;
  token: null | string;
  id?: null | string;
  status: null | string;
  error: undefined | string | null;
  isLoggedIn: boolean;
};

const initialState: TInitialState = {
  email: null,
  token: null,
  id: null,
  isLoggedIn: false,
  status: '',
  error: null,
};

type TresLogin = {
  token: string;
};

type TpropsLogin = {
  username: string;
  password: string;
};

export const fetchUserLogin = createAsyncThunk<
  TresLogin,
  TpropsLogin,
  { rejectValue: string }
>('auth/fetchUserLogin', async function ({ username, password }, { rejectWithValue }) {
  const response = await fetch(`${baseUrl}auth/token/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }
  const data = { token: await response.json(), name: username };
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isLoggedIn = true;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
