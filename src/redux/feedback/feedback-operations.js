import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendFeedback = createAsyncThunk(
  "feedback/send",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const { email, title, comment, rating } = feedbackData;
      const url = `https://api.stastiem.com/user/send-feedback?user_email=${encodeURIComponent(
        email
      )}&title=${encodeURIComponent(title)}&comment=${encodeURIComponent(
        comment
      )}&rating=${rating}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// export const sendFeedback = createAsyncThunk(
//   "feedback/send",
//   async (feedbackData, { rejectWithValue }) => {
//     try {
//       const response = await fetch("https://app.stastiem.com/api/feedback", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(feedbackData),
//       });
//       if (!response.ok) {
//         throw new Error("Request failed");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
