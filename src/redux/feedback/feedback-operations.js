import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendFeedback = createAsyncThunk(
  "feedback/send",
  async (feedbackData, { rejectWithValue }) => {
    try {
      console.log("started fetch");
      const response = await fetch("http://localhost:3000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
