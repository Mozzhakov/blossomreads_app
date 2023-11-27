"use client";
import { useState, useEffect } from "react";
import { LoginIcon } from "./Icons";
import { useSelector } from "react-redux";
import { useNotify } from "@/hooks/useNotify";
import { getIsAuthError, getAuthError } from "@/redux/auth/auth-selectors";
import loginImage from "../images/login-image.jpg";
import styles from "../scss/login-form.module.scss";
import Image from "next/image";

function LoginForm({ handleLogin, email, setEmail }) {
  const { showFailure } = useNotify();
  const [error, setError] = useState(null);
  const isError = useSelector(getIsAuthError);
  const errorMessage = useSelector(getAuthError);

  useEffect(() => {
    if (isError) {
      showFailure(errorMessage);
    }
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
            <p>Login to your profile using email</p>
          </div>
          <div className={styles["form-input-wrapper"]}>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={handleChange}
              onBlur={handleChange}
              className={styles["form-input"]}
            />
            <label className={styles["form-label"]}>Email</label>
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
    </div>
  );
}

export default LoginForm;
