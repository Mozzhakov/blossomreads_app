import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, sendLink } from "./auth-operations";

const authorization = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    isLoggedIn: false,
    isEmailSent: false,
    isError: false,
    error: "",
  },
  // reducers: {
  //   resetAuthState: (state) => {
  //     state.isLoading = false;
  //     state.isLoggedIn = false;
  //     state.isError = false;
  //     state.error = "";
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.isError = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = true;
        state.error = "Invalid email or expired link.";
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.isError = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logOut.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = true;
        state.error = "Something went wrong";
      })
      .addCase(sendLink.pending, (state) => {
        state.isLoading = true;
        state.isEmailSent = false;
        state.isError = false;
      })
      .addCase(sendLink.fulfilled, (state) => {
        state.isLoading = false;
        state.isEmailSent = true;
        state.isError = false;
      })
      .addCase(sendLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isEmailSent = false;
        state.isError = true;
        state.error = action.payload.message;
      });
  },
});
// export const { resetAuthState } = authorization.actions;
export const authReducer = authorization.reducer;
