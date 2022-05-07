import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../slicers/employeeSlice';

export const store = configureStore({
    reducer: employeeReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;