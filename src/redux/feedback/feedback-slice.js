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
  reducers: {
    resetFeedbackStatus: (state) => {
      state.isLoading = false;
      state.isFeedbackSent = false;
      state.successMessage = "";
      state.isError = false;
      state.error = "";
    },
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
        state.successMessage = "Feedback sent successfully";
      })
      .addCase(sendFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isFeedbackSent = false;
        state.error = "Failed to send feedback. please try again later";
      });
  },
});
export const { resetFeedbackStatus } = feedback.actions;
export const feedbackReducer = feedback.reducer;
