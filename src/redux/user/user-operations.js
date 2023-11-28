import { createAsyncThunk } from "@reduxjs/toolkit";
// import { signInWithEmailLink, signOut, getAuth } from "firebase/auth";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token, { rejectWithValue }) => {
    const url = "https://api.stastiem.com/user/info";
    const headers = {
      accept: "application/json",
      "access-token": token,
    };
    try {
      const response = await fetch(url, { headers });
      //   if (!response.ok) {
      //     throw new Error("Request failed");
      //   }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
