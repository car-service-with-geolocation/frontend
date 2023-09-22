import { combineReducers, configureStore } from '@reduxjs/toolkit';
import autoServiceSlice from './autoServicesSlice';
import autoServiceIdSlice from './autoServiceIdSlice';
import autoServiceByCoordSlice from './autoServiceByCoordSlice';

export const rootReducer = combineReducers({
  autoServiceSlice,
  autoServiceIdSlice,
  autoServiceByCoordSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
