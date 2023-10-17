import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import autoServiceByCoordSlice from './autoServiceByCoordSlice';
import autoServiceIdSlice from './autoServiceIdSlice';
import autoServiceSlice from './autoServicesSlice';
import carsSlice from './carsSlice';
import userDataSlice from './userDataSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    mainAutoServices: autoServiceSlice,
    autoServiceById: autoServiceIdSlice,
    autoServiceByCoord: autoServiceByCoordSlice,
    cars: carsSlice,
    user: userDataSlice,
  },
});
