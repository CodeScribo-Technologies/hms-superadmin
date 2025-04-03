// src/redux/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice'; // Example reducer
export const store = configureStore({
  reducer: {
    auth: authReducer, // Add at least one valid reducer
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;