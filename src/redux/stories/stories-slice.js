import { createSlice } from "@reduxjs/toolkit";
import { fetchStories, editStory, editStoryImage } from "./stories-operations";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.error =
    "The error occurred during fetching the stories. Please reload the page.";
};

const stories = createSlice({
  name: "stories",
  initialState: { items: [], isLoading: false, isError: false, error: "" },
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
      })
      .addCase(editStory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error =
          "The error occurred during editing the story. Please try again.";
      })

      .addCase(editStoryImage.pending, handlePending)
      .addCase(editStoryImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editStoryImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error =
          "The error occurred during saving the image. Please try again.";
      });
  },
});

// const persistConfig = {
//   key: "stories",
//   storage,
//   whitelist: ["items"],
// };

export const storiesReducer = stories.reducer;

// export const storiesReducer = persistReducer(persistConfig, stories.reducer);
