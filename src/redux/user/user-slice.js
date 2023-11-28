import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./user-operations";

const user = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.error =
          "The error occurred during fetching user information. Please reload the page.";
      });
  },
});

export const userReducer = user.reducer;
