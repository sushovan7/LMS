import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  isAuthenticated: false,
};

const userAuthSlice = createSlice({
  name: "userAuthSlice",
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      state.userData = { ...state.userData, ...action.payload.userData };
      state.isAuthenticated = true;
    },
    loggetOutUser: (state) => {
      state.userData = {};
      state.isAuthenticated = false;
    },
  },
});

export const { loggedInUser, logInUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;
