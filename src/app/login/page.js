"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, sendLink } from "@/redux/auth/auth-operations";
import { auth, actionCodeSettings } from "@/firebase/Firebase";
import LoginWithoutLink from "@/components/LoginWithoutLink";
import LoginWithLink from "@/components/LoginWithLink";
import PublicRoute from "@/components/PublicRoute";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";

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
  const checkIfEmailIsRegistered = async (emailAddress) => {
    const auth = getAuth();

    try {
      const methods = await fetchSignInMethodsForEmail(emailAddress);
      // If methods array is empty, the email is not registered.
      return methods.length > 0;
    } catch (error) {
      console.error("Error checking if email is registered:", error.message);
      // Handle error.
      return false;
    }
  };
  async function handleSendLink(e) {
    const isEmailRegistered = await checkIfEmailIsRegistered(email);
    if (isEmailRegistered) {
      console.log("Email is registered.");
    } else {
      // Display a message indicating that the email is not registered.
      console.log("Email is not registered. Please sign up.");
    }
    e.preventDefault();
    dispatch(sendLink({ auth, email, actionCodeSettings }));
  }

  return (
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
  );
}

export default Login;
