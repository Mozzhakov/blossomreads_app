"use client";

import { useState, useEffect } from "react";
import { auth } from "@/firebase/Firebase";
import { signOut, signInWithEmailLink } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./page.module.css";
import WelcomePage from "@/components/WelcomePage";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");

  async function handleSignIn(e) {
    e.preventDefault();
    const emailLink = window.location.href;
    signInWithEmailLink(auth, email, emailLink)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  function handleLogout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    <main className={styles.main}>
      {user ? (
        <>
          <WelcomePage name={user.email} />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : loading ? (
        <h2>Loading...</h2>
      ) : (
        // <LoginForm />
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
          <button type="submit">Sign-In</button>
        </form>
      )}
    </main>
  );
}
// imozzhakov@icloud.com
