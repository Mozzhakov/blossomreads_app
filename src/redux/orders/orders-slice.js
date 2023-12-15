import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, fetchOrdersAndStories } from "./orders-operations";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.error =
    "The error occurred during fetching the orders. Please reload the page.";
};

const orders = createSlice({
  name: "orders",
  initialState: { items: [], isLoading: false, isError: null, error: "" },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchOrders.pending, handlePending)
      // .addCase(fetchOrders.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.error = null;
      //   state.items = action.payload;
      // })
      // .addCase(fetchOrders.rejected, handleRejected)
      .addCase(fetchOrdersAndStories.pending, handlePending)
      .addCase(fetchOrdersAndStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchOrdersAndStories.rejected, handleRejected);
  },
});

const persistConfig = {
  key: "orders",
  storage,
  whitelist: ["items"],
};

// export const ordersReducer = orders.reducer;
export const ordersReducer = persistReducer(persistConfig, orders.reducer);
