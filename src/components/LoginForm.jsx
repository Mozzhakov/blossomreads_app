"use client";
import { useState } from "react";
import { auth, actionCodeSettings } from "@/firebase/Firebase";
import {
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
} from "firebase/auth";
function LoginForm() {
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log(user);
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode);
    //     console.log(errorMessage);
    //   });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Send Sign-In Link</button>
      </form>
    </div>
  );
}

export default LoginForm;
