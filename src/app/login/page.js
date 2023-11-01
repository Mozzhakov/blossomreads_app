"use client";
import { useState } from "react";
import { auth } from "@/firebase/Firebase";
import LoginForm from "@/components/LoginForm";
import styles from "../../styles/page.module.css";

export default function Login() {
  const [email, setEmail] = useState("");

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

  return <div className={styles.main}></div>;
}
