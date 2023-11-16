import { createSlice } from "@reduxjs/toolkit";
import { fetchStories, editStory } from "./stories-operations";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const handlePending = (state) => {
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
      .addCase(fetchStories.pending, handlePending)
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchStories.rejected, handleRejected)

      .addCase(editStory.pending, handlePending)
      .addCase(editStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // state.items = action.payload;
      })
      .addCase(editStory.rejected, handleRejected);
  },
});

const persistConfig = {
  key: "stories",
  storage,
  whitelist: ["items"],
};

// export const storiesReducer = stories.reducer;

export const storiesReducer = persistReducer(persistConfig, stories.reducer);
