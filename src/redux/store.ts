import { configureStore } from "@reduxjs/toolkit";
import vendorApi from "./feature/api/vendor"; 
export const store = configureStore({
  reducer: {
    [vendorApi.reducerPath]: vendorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vendorApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
