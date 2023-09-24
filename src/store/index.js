import { configureStore } from '@reduxjs/toolkit';

import autoServiceByCoordSlice from './autoServiceByCoordSlice';
import autoServiceIdSlice from './autoServiceIdSlice';
import autoServiceSlice from './autoServicesSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    mainAutoServices: autoServiceSlice,
    autoServiceById: autoServiceIdSlice,
    autoServiceByCoord: autoServiceByCoordSlice,
  },
});
