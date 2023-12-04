"use client";
import { useState, useEffect } from "react";
import { LoginIcon, SuccessIcon } from "./Icons";
import { useSelector } from "react-redux";
import { useNotify } from "@/hooks/useNotify";
import { Loader } from "./Loader";
import {
  getIsAuthError,
  getAuthError,
  getIsEmailSent,
  getIsLoading,
} from "@/redux/auth/auth-selectors";
import loginImage from "../images/login-image.jpg";
import styles from "../scss/login-form.module.scss";
import Image from "next/image";

function LoginForm({ handleLogin, email, setEmail }) {
  const { showFailure, showSuccess } = useNotify();
  const [error, setError] = useState(null);
  const isError = useSelector(getIsAuthError);
  const errorMessage = useSelector(getAuthError);
  const isEmailSent = useSelector(getIsEmailSent);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    if (isError) {
      showFailure(errorMessage);
    }
    // if (isEmailSent) {
    //   showSuccess("A login link has been sent to your email successfully.");
    // }
  }, [errorMessage, isError, showFailure]);

  // function isValidEmail(email) {
  //   return /\S+@\S+\.\S+/.test(email);
  // }

  const handleChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    if (event.target.value.length < 0) {
      setError("Email is invalid");
    } else {
      setError(null);
    }
  };

  return (
    <div className={styles["login-page"]}>
      {isEmailSent ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <SuccessIcon size={50} color={"yellowgreen"} />
            <h2>Email is sent successfully</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <p>We&#39;ve sent a confirmation email to your inbox.</p>
            <p>Please check your email to complete the login process.</p>
          </div>
        </>
      ) : (
        <>
          <h1 className={styles["login-page-title"]}>
            Please login to get access to your profile.
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <form onSubmit={handleLogin} className={styles["form"]}>
              <div style={{ textAlign: "center" }}>
                <h2 className={styles["form-title"]}>Welcome</h2>
                <p className={styles["form-subtitle"]}>
                  Login to your profile using email
                </p>
              </div>
              <div className={styles["form-input-wrapper"]}>
                <label className={styles["form-label"]} htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="example@mail.com"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleChange}
                  className={styles["form-input"]}
                />
              </div>
              <button type="submit" className={styles["form-btn"]}>
                <LoginIcon color={"#fff"} size={20} />
                Login
              </button>
            </form>
            <Image
              src={loginImage}
              alt="Books"
              width={500}
              className={styles["form-image"]}
              style={{
                borderRadius: "0 10px 10px 0",
              }}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {isLoading && <Loader />}
        </>
      )}
    </div>
  );
}

export default LoginForm;
