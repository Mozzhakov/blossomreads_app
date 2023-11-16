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

export const editStory = createAsyncThunk(
  "stories/editStory",
  async (
    { order_id, story_id, story_title, story_text, token },
    { rejectWithValue }
  ) => {
    const url = `https://api.stastiem.com/user/stories/update?order_id=${order_id}&story_number=${story_id}&story_title=${story_title}&story_text=${story_text}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        accept: "application/json",
        "access-token": token,
      },
    };
    try {
      const response = await fetch(url, requestOptions);
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
