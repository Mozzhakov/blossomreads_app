"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, sendLink } from "@/redux/auth/auth-operations";
import { auth, actionCodeSettings } from "@/firebase/Firebase";
import LoginForm from "@/components/LoginForm";
import PublicRoute from "@/components/PublicRoute";

function Login() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const params = new URL(document.location).searchParams;
  const paramsArr = Array.from(params.entries());
  const paramsSize = paramsArr.length;

  async function handleSignIn(e) {
    e.preventDefault();
    const emailLink = window.location.href;
    dispatch(logIn({ auth, email, emailLink }));
  }
  async function handleSendLink(e) {
    e.preventDefault();
    dispatch(sendLink({ auth, email, actionCodeSettings }));
  }

  return (
    <PublicRoute>
      <LoginForm
        handleLogin={paramsSize === 4 ? handleSignIn : handleSendLink}
        email={email}
        setEmail={setEmail}
      />
    </PublicRoute>
  );
}

export default Login;
