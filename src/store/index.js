import { configureStore } from '@reduxjs/toolkit';
import autoServiceSlice from './autoServicesSlice';
import autoServiceIdSlice from './autoServiceIdSlice';
import autoServiceByCoordSlice from './autoServiceByCoordSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    mainAutoServices: autoServiceSlice,
    autoServiceById: autoServiceIdSlice,
    autoServiceByCoord: autoServiceByCoordSlice,
  },
});
