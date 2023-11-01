import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailLink } from "firebase/auth";

export const logIn = createAsyncThunk(
  "auth/login",
  async ({ auth, email, emailLink }, { rejectWithValue }) => {
    try {
      const response = await signInWithEmailLink(auth, email, emailLink);
      return response.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = user;
      return response;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
