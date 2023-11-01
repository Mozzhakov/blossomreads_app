import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStories = createAsyncThunk(
  "stories/fetchStories",
  async ({ id, token }, { rejectWithValue }) => {
    const url = `https://api.stastiem.com/user/stories/list?order_id=${id}`;
    const headers = {
      accept: "application/json",
      "access-token": token,
    };
    try {
      const response = await fetch(url, { headers });
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
