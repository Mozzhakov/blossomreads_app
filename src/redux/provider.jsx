"use client";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
// import { SessionProvider } from "next-auth/react";

export function ReduxProvider({ children }) {
  return (
    // <SessionProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
    // </SessionProvider>
  );
}
