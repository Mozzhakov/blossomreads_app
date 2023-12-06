"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, sendLink } from "@/redux/auth/auth-operations";
import { auth, actionCodeSettings } from "@/firebase/Firebase";
import { SidebarContainer } from "@/components/SidebarContainer";
import LoginWithoutLink from "@/components/LoginWithoutLink";
import LoginWithLink from "@/components/LoginWithLink";
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
    await dispatch(sendLink({ auth, email, actionCodeSettings }));
    setEmail("");
  }

  return (
    <SidebarContainer>
      <PublicRoute>
        {paramsSize === 4 ? (
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
