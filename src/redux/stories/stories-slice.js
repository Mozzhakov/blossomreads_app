import { createSlice } from "@reduxjs/toolkit";
import { fetchStories } from "./stories-operations";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const handlePendidng = (state) => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const stories = createSlice({
  name: "stories",
  initialState: { items: [], isLoading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, handlePendidng)
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchStories.rejected, handleRejected);
  },
});

const persistConfig = {
  key: "stories",
  storage,
  whitelist: ["items"],
};

// export const storiesReducer = stories.reducer;

export const storiesReducer = persistReducer(persistConfig, stories.reducer);
