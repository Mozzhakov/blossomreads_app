import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailLink, signOut } from "firebase/auth";

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

export const sendLink = createAsyncThunk(
  "auth/sendLink",
  async ({ email, testing }, { rejectWithValue }) => {
    const url = `https://api.stastiem.com/firebase/signin-link-to-email?user_email=${encodeURIComponent(
      email
    )}&testing=${testing}`;
    const headers = {
      accept: "application/json",
    };
    try {
      const response = await fetch(url, { method: "GET", headers });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async ({ auth }, { rejectWithValue }) => {
    try {
      const response = await signOut(auth);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
