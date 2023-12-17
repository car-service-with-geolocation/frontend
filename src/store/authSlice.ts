/* eslint-disable func-names */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { baseUrl } from '../utils/constants';
import {
  TInitialState,
  TpropsLogin,
  TpropsRegistration,
  TresLogin,
  TresRegistration,
  TuserDataChange,
} from '../utils/types';

const initialState: TInitialState = {
  id: null,
  email: null,
  isLoggedIn: false,
  first_name: null,
  date_joined: null,
  phone_number: null,
  status: '',
  error: null,
};

// FETCH-USER-ME
export const fetchUserMe = createAsyncThunk<
  TresRegistration,
  undefined,
  { rejectValue: string }
>('auth/fetchUserMe', async function (_, { rejectWithValue }) {
  const token = localStorage.getItem('JWT');
  const response = await fetch(`${baseUrl}auth/users/me`, {
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

// FETCH-USER-LOGIN
export const fetchUserLogin = createAsyncThunk<
  TresLogin,
  TpropsLogin,
  { rejectValue: string }
>('auth/fetchUserLogin', async function ({ email, password }, { rejectWithValue }) {
  const response = await fetch(`${baseUrl}auth/token/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }
  const data = { token: await response.json() };
  localStorage.setItem('JWT', data.token.auth_token);
  return data;
});

// FETCH-USER-REGISTRATION
export const fetchUserRegistration = createAsyncThunk<
  TresRegistration,
  TpropsRegistration,
  { rejectValue: string }
>(
  'auth/fetchUserRegistration',
  async function ({ email, first_name, password }, { rejectWithValue }) {
    const response = await fetch(`${baseUrl}auth/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, first_name }),
    });
    if (!response.ok) {
      return response.json().then((err) => {
        return rejectWithValue(err.email);
      });
    }
    const data = await response.json();
    return data;
  }
);

// FETCH USER DATA CHANGE

export const fetchUserDataChange = createAsyncThunk<
  TresRegistration,
  TuserDataChange,
  { rejectValue: string }
>(
  'auth/fetchUserDataChange',
  async function ({ email, first_name, phone_number }, { rejectWithValue }) {
    const token = localStorage.getItem('JWT');
    const response = await fetch(`${baseUrl}auth/users/me/`, {
      method: 'PATCH',
      headers: {
        authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, first_name, phone_number, password: 'qweqweqwe' }),
    });
    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }
    const data = await response.json();
    return data;
  }
);

// FETCH USER LOGUOT

export const fetchUserLogout = createAsyncThunk<
  string,
  undefined,
  { rejectValue: string }
>('auth/fetchUserLogout', async function (_, { rejectWithValue }) {
  const token = localStorage.getItem('JWT');
  const response = await fetch(`${baseUrl}auth/token/logout/`, {
    method: 'POST',
    headers: {
      authorization: `Token ${token}`,
    },
  });
  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }
  localStorage.removeItem('JWT');
  return 'Пользователь вышел из аккаунта';
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setUser(state, action) {
    //   state.email = action.payload.email;
    //   state.id = action.payload.id;
    //   state.isLoggedIn = true;
    // },
    // removeUser(state) {
    //   state.email = null;
    //   state.id = null;
    //   state.isLoggedIn = false;
    // },
  },
  extraReducers: (builder) => {
    // FETCH-USER-LOGIN
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserLogin.fulfilled, (state) => {
        state.status = 'resolved';
        state.isLoggedIn = true;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
    // FETCH-USER-REGISTRATION
    builder
      .addCase(fetchUserRegistration.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserRegistration.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.email = action.payload.email;
        state.id = action.payload.id;
        state.first_name = action.payload.first_name;
        state.date_joined = action.payload.date_joined;
      })
      .addCase(fetchUserRegistration.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
    // FETCH-USER-ME
    builder
      .addCase(fetchUserMe.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserMe.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.email = action.payload.email;
        state.id = action.payload.id;
        state.first_name = action.payload.first_name;
        state.date_joined = action.payload.date_joined;
        state.phone_number = action.payload.phone_number;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserMe.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
    // FETCH USER DATA CHANGE
    builder
      .addCase(fetchUserDataChange.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserDataChange.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.email = action.payload.email;
        state.first_name = action.payload.first_name;
        state.phone_number = action.payload.phone_number;
      })
      .addCase(fetchUserDataChange.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
    // FETCH USER LOGOUT
    builder
      .addCase(fetchUserLogout.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserLogout.fulfilled, (state) => {
        state.status = 'resolved';
        state.date_joined = null;
        state.email = null;
        state.first_name = null;
        state.id = null;
        state.isLoggedIn = false;
        state.phone_number = null;
      })
      .addCase(fetchUserLogout.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

// export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
