import { createSlice } from "@reduxjs/toolkit";
import { logIn, refreshUser } from "./auth-operations";
import { auth } from "@/firebase/Firebase";

const authorization = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = auth.currentUser;
      });
  },
});
// export default authorization.reducer;
export const authReducer = authorization.reducer;
