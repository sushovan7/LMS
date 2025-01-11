import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { userAuthApi } from "@/features/api/userAuthApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
});
