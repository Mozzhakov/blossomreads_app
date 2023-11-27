"use client";
import { useState, useEffect } from "react";
import { auth } from "@/firebase/Firebase";
import LoginForm from "@/components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "@/redux/auth/auth-operations";
import { useLayoutEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import PublicRoute from "@/components/PublicRoute";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function handleSignIn(e) {
    e.preventDefault();
    const emailLink = window.location.href;
    dispatch(logIn({ auth, email, emailLink }));
  }

  return (
    <PublicRoute>
      <LoginForm handleLogin={handleSignIn} email={email} setEmail={setEmail} />
    </PublicRoute>
  );
}

export default Login;
