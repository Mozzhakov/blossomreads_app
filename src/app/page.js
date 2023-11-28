"use client";

import { useEffect } from "react";
import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { fetchOrders } from "@/redux/orders/orders-operations";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import { useNotify } from "@/hooks/useNotify";
import Header from "@/components/Header";
import {
  getOrders,
  getIsOrderError,
  getOrderError,
} from "@/redux/orders/orders-selectors";
import Hero from "@/components/Hero";
import OrdersList from "@/components/OrdersList";

import PrivateRoute from "@/components/PrivateRoute";

function Home() {
  const { showFailure } = useNotify();
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user && user.stsTokenManager.expirationTime > Date.now()) {
      dispatch(fetchOrders(user.accessToken));
    }
  }, [user, dispatch]);

  const orders = useSelector(getOrders);
  const isOrderError = useSelector(getIsOrderError);
  const errorMessage = useSelector(getOrderError);

  useEffect(() => {
    if (isOrderError) {
      showFailure(errorMessage);
    }
  }, [errorMessage, isOrderError, showFailure]);
  return (
    <PrivateRoute>
      <main>
        {orders && !loading && (
          <>
            <Hero orders={orders} />
            <Suspense fallback={<p>Loading orders...</p>}>
              <OrdersList orders={orders} />
            </Suspense>
          </>
        )}
        {error && <p>{error}</p>}
      </main>
    </PrivateRoute>
  );
}

export default Home;
