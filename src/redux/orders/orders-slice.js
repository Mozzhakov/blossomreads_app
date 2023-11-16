import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders } from "./orders-operations";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const handlePending = (state) => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const orders = createSlice({
  name: "orders",
  initialState: { items: [], isLoading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, handlePending)
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, handleRejected);
  },
});

const persistConfig = {
  key: "orders",
  storage,
  whitelist: ["items"],
};

// export const ordersReducer = orders.reducer;
export const ordersReducer = persistReducer(persistConfig, orders.reducer);
