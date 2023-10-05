"use client";

import { useState } from "react";
import { auth } from "@/firebase/Firebase";
import { signInWithEmailLink } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import WelcomePage from "@/components/WelcomePage";
import LoginForm from "@/components/LoginForm";
import styles from "../styles/page.module.css";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  console.log(user);
  function handleSignIn(e) {
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

  return (
    <main className={styles.main}>
      {user ? (
        <>
          <WelcomePage name={user.email} />
        </>
      ) : loading ? (
        <h2>Loading...</h2>
      ) : (
        <LoginForm
          handleLogin={handleSignIn}
          email={email}
          setEmail={setEmail}
        />
      )}
      {error && <p>{error}</p>}
    </main>
  );
}
