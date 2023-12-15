import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchOrders = createAsyncThunk(
//   "orders/fetchOrders",
//   async (token, { rejectWithValue }) => {
//     const url = "https://api.stastiem.com/user/orders/list";
//     const headers = {
//       accept: "application/json",
//       "access-token": token,
//     };
//     try {
//       const response = await fetch(url, { headers });
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

export const fetchOrdersAndStories = createAsyncThunk(
  "orders/fetchOrdersAndStories",
  async (user, { rejectWithValue }) => {
    const ordersUrl = "https://api.stastiem.com/user/orders/list";
    const storiesUrl = `https://api.stastiem.com/user/stories/list`;

    const ordersHeaders = {
      accept: "application/json",
      "access-token": user.accessToken,
    };

    try {
      // Fetch orders
      const ordersResponse = await fetch(ordersUrl, { headers: ordersHeaders });
      if (!ordersResponse.ok) {
        throw new Error("Orders request failed");
      }
      const orders = await ordersResponse.json();

      // Filter orders
      const filteredOrders =
        orders &&
        orders.filter((order) =>
          ["created", "queued", "paid"].includes(order.status)
        );
      if (filteredOrders.length === 0) {
        return [];
      }

      // Fetch stories based on filtered orders
      const ordersWithStories = await Promise.all(
        filteredOrders.map(async (order) => {
          const storiesUrlWithOrderId = `${storiesUrl}?order_id=${order.order_id}`;
          const storiesHeaders = {
            accept: "application/json",
            "access-token": user.accessToken,
          };

          try {
            const storiesResponse = await fetch(storiesUrlWithOrderId, {
              headers: storiesHeaders,
            });
            if (!storiesResponse.ok) {
              throw new Error("Stories request failed");
            }
            const stories = await storiesResponse.json();
            return {
              ...order,
              stories,
            };
          } catch (error) {
            return rejectWithValue(error.message);
          }
        })
      );

      // Sort orders with stories
      const sortedOrders = ordersWithStories.sort((a, b) => {
        const statusPriority = { paid: 1, queued: 2, created: 3 };
        const statusA = statusPriority[a.status];
        const statusB = statusPriority[b.status];

        if (statusA === statusB) {
          return new Date(a.created_at) - new Date(b.created_at);
        }

        return statusA - statusB;
      });
      return sortedOrders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
