import { userAuthApi } from "@/features/api/userAuthApi";
import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
});
