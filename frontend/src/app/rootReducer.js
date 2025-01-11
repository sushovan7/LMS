import { userAuthApi } from "@/features/api/userAuthApi";
import { combineReducers } from "@reduxjs/toolkit";
import userAuthReducer from "../features/userAuthSlice";

export const rootReducer = combineReducers({
  [userAuthApi.reducerPath]: userAuthApi.reducer,
  userAuth: userAuthReducer,
});
