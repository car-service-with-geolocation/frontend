import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Theme } from '../utils/types';

interface IModeData {
  mode: Theme;
}

const initialState = { mode: 'dark' } as IModeData;

const darkLightModeSlice = createSlice({
  name: 'darkLightMode',
  initialState,
  reducers: {
    switchMode: (state, action: PayloadAction<Theme>) => {
      state.mode = action.payload;
    },
  },
});

export const { switchMode } = darkLightModeSlice.actions;
export default darkLightModeSlice.reducer;
