"use client";
import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { Loader } from "@/components/Loader";
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
  const [user, loading] = useAuthState(auth);
  console.log(user);
  const orders = useSelector(getOrders);
  const isOrderError = useSelector(getIsOrderError);
  const errorMessage = useSelector(getOrderError);
  console.log(user);
  return (
    <main>
      <SidebarContainer>
        <PrivateRoute>
          {!loading && user ? (
            <>
              <Hero orders={orders} />
              <OrdersList user={user} loading={loading} />
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
