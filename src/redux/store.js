import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/auth-slice";
import { ordersReducer } from "./orders/orders-slice";
import { storiesReducer } from "./stories/stories-slice";
import { userReducer } from "./user/user-slice";
import { feedbackReducer } from "./feedback/feedback-slice";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    stories: storiesReducer,
    user: userReducer,
    feedback: feedbackReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/login/fulfilled",
          "auth/refreshUser/fulfilled",
          "persist/PERSIST",
        ],
        ignoredActionPaths: ["meta.arg"],
        ignoredPaths: ["auth.user"],
      },
    }),
});

export const persistor = persistStore(store);
