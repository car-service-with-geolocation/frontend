import { combineReducers, configureStore } from '@reduxjs/toolkit';
import autoServiceReducer from './autoServicesSlice';
import autoServiceIdSlice from './autoServiceIdSlice';

export const rootReducer = combineReducers({
  autoServiceReducer,
  autoServiceIdSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
