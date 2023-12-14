"use client";

import { auth } from "@/firebase/Firebase";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchOrders } from "@/redux/orders/orders-operations";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
// import { Suspense } from "react";
import { Loader } from "@/components/Loader";
// import { useNotify } from "@/hooks/useNotify";
import { SidebarContainer } from "@/components/SidebarContainer";
import {
  getOrders,
  getIsOrderError,
  getOrderError,
} from "@/redux/orders/orders-selectors";
import Hero from "@/components/Hero";
import OrdersList from "@/components/OrdersList";
import PrivateRoute from "@/components/PrivateRoute";

function Home() {
  const [user, loading, error] = useAuthState(auth);

  const orders = useSelector(getOrders);

  const isOrderError = useSelector(getIsOrderError);
  const errorMessage = useSelector(getOrderError);

  return (
    <main>
      <SidebarContainer>
        <PrivateRoute>
          {!loading && user ? (
            <>
              <Hero orders={orders} />
              <OrdersList user={user} />
            </>
          ) : (
            <Loader />
          )}
          {isOrderError && <p>{errorMessage}</p>}
        </PrivateRoute>
      </SidebarContainer>
    </main>
  );
}

export default Home;
