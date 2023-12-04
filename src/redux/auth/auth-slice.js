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
        state.error =
          "Wrong email or login link. Please log in using the link in the email we sent.";
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
      .addCase(sendLink.rejected, (state) => {
        state.isLoading = false;
        state.isEmailSent = false;
        state.isError = true;
        state.error =
          "Something went wrong while sending the email. Please try again.";
      });
  },
});

export const authReducer = authorization.reducer;
