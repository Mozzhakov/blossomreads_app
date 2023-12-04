import { createSlice } from "@reduxjs/toolkit";
import { sendFeedback } from "./feedback-operations";
const feedback = createSlice({
  name: "feedback",
  initialState: {
    isLoading: false,
    isFeedbackSent: false,
    successMessage: "",
    isError: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendFeedback.pending, (state) => {
        state.isLoading = true;
        state.isFeedbackSent = false;
        state.isError = false;
      })
      .addCase(sendFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFeedbackSent = action.payload.success;
        state.successMessage = action.payload.message;
      })
      .addCase(sendFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isFeedbackSent = action.payload.success;
        state.error = action.payload.message + action.payload.error;
      });
  },
});

export const feedbackReducer = feedback.reducer;
