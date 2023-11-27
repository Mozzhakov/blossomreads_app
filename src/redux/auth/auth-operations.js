import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailLink, signOut, getAuth } from "firebase/auth";
// import { auth } from "@/firebase/Firebase";

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

// export const refreshUser = createAsyncThunk(
//   "auth/refreshUser",
//   (_, { rejectWithValue }) => {
//     try {
//       const response = getAuth(auth);
//       // console.log(response);
//       // return response.currentUser;
//     } catch (error) {
//       rejectWithValue(error.message);
//     }
//   }
// );

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
