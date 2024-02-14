"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, sendLink } from "@/redux/auth/auth-operations";
import { auth } from "@/firebase/Firebase";
import { SidebarContainer } from "@/components/SidebarContainer";
import LoginWithoutLink from "@/components/LoginWithoutLink";
// import LoginWithLink from "@/components/LoginWithLink";
import PublicRoute from "@/components/PublicRoute";
import { isSignInWithEmailLink } from "firebase/auth";
import { getIsAuthError } from "@/redux/auth/auth-selectors";
import { Loader } from "@/components/Loader";

function Login() {
  const testing = !window.location.href.includes("app.blossomreads.com");
  const isSignInLink = isSignInWithEmailLink(auth, window.location.href);
  const isError = useSelector(getIsAuthError);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const emailFromUrl = new URL(document.location).searchParams.get("email");
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
    // setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isSignInLink && email) {
      handleSignIn();
    }
  }, [isSignInLink, email]);

  async function handleSignIn() {
    const emailLink = window.location.href;
    await dispatch(logIn({ auth, email, emailLink }));
  }

  async function handleSendLink(e) {
    e.preventDefault();
    await dispatch(sendLink({ email, testing }));
  }
  console.log(isSignInLink || !isError);
  return (
    <SidebarContainer>
      <PublicRoute>
        {isSignInLink || !isError ? (
          <LoginWithoutLink
            handleLogin={handleSendLink}
            email={email}
            setEmail={setEmail}
          />
        ) : (
          <Loader />
        )}
      </PublicRoute>
    </SidebarContainer>
  );
}

export default Login;
