"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, sendLink } from "@/redux/auth/auth-operations";
import { auth } from "@/firebase/Firebase";
import { SidebarContainer } from "@/components/SidebarContainer";
import LoginWithoutLink from "@/components/LoginWithoutLink";
import LoginWithLink from "@/components/LoginWithLink";
import PublicRoute from "@/components/PublicRoute";
import { isSignInWithEmailLink } from "firebase/auth";

function Login() {
  const testing = !window.location.href.includes("app.stastiem.com");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  async function handleSignIn(e) {
    e.preventDefault();
    const emailLink = window.location.href;
    dispatch(logIn({ auth, email, emailLink }));
  }

  async function handleSendLink(e) {
    e.preventDefault();
    await dispatch(sendLink({ email, testing }));
  }

  return (
    <SidebarContainer>
      <PublicRoute>
        {isSignInWithEmailLink(auth, window.location.href) ? (
          <LoginWithLink
            handleLogin={handleSignIn}
            email={email}
            setEmail={setEmail}
          />
        ) : (
          <LoginWithoutLink
            handleLogin={handleSendLink}
            email={email}
            setEmail={setEmail}
          />
        )}
      </PublicRoute>
    </SidebarContainer>
  );
}

export default Login;
