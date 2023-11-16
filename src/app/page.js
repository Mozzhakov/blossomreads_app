"use client";

import { useState, useEffect } from "react";
import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { logIn, refreshUser } from "@/redux/auth/auth-operations";
import { fetchOrders } from "@/redux/orders/orders-operations";
import { useSelector } from "react-redux";
import { getOrders } from "@/redux/selectors";
import Hero from "@/components/Hero";
import LoginForm from "@/components/LoginForm";
import OrdersList from "@/components/OrdersList";
import styles from "../styles/page.module.css";

export default function Home() {
  const dispatch = useDispatch();

  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  console.log(user);
  useEffect(() => {
    dispatch(refreshUser(auth.currentUser));
  }, [dispatch]);

  async function handleSignIn(e) {
    e.preventDefault();
    const emailLink = window.location.href;
    dispatch(logIn({ auth, email, emailLink }));
  }

  useEffect(() => {
    if (user && user.stsTokenManager.expirationTime > Date.now()) {
      dispatch(fetchOrders(user.accessToken));
    }
  }, [user, dispatch]);

  const orders = useSelector(getOrders);

  return (
    <main className={styles.main}>
      {user ? (
        <Hero />
      ) : loading ? (
        <h2>Loading...</h2>
      ) : (
        <LoginForm
          handleLogin={handleSignIn}
          email={email}
          setEmail={setEmail}
        />
      )}
      {orders && !loading && <OrdersList orders={orders} />}
      {/* <AutoSave /> */}
      {error && <p>{error}</p>}
    </main>
  );
}
