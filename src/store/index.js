import { combineReducers, configureStore } from '@reduxjs/toolkit';
import autoserviceReducer from './autoServicesSlice';

export const rootReducer = combineReducers({
  toolkit: autoserviceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
