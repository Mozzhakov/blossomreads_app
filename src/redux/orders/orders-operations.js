import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (token, { rejectWithValue }) => {
    const url = "https://api.stastiem.com/user/orders/list";
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

// export const fetchOrders = createAsyncThunk(
//   "orders/fetchOrders",
//   async (_, { rejectWithValue }) => {
//     const url = "http://localhost:3000/api/orders";
//     try {
//       const response = await fetch(url, {
//         accept: "application/json",
//         "access-token": token,
//       });
//       if (!response.ok) {
//         throw new Error("Request failed");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
