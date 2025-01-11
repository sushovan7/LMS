import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";

const USER_API = "http://localhost:3000/api/v1/user";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (signUpInputData) => ({
        url: "/signup",
        method: "POST",
        body: signUpInputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (loginInputData) => ({
        url: "/login",
        method: "POST",
        body: loginInputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data && result.data.token) {
            dispatch(
              userLoggedIn({
                user: result.data.token,
              })
            );
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
