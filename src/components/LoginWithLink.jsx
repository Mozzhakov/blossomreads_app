"use client";
// import { useState } from "react";
import { LoginIcon } from "./Icons";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";
import { EmailInput } from "./EmailInput";
import {
  getIsAuthError,
  getAuthError,
  getIsLoading,
} from "@/redux/auth/auth-selectors";
import styles from "../scss/login-form.module.scss";

function LoginWithLink({ handleLogin, email, setEmail }) {
  // const [error, setError] = useState(null);
  const isError = useSelector(getIsAuthError);
  const errorMessage = useSelector(getAuthError);
  const isLoading = useSelector(getIsLoading);

  const handleChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    // if (event.target.value.length < 1) {
    //   setError("Email is invalid");
    // } else {
    //   setError(null);
    // }
  };

  return (
    <div className={styles["login-page"]}>
      <>
        <h1 className={styles["login-page-title"]}>Quick Confirmation</h1>
        <div className={styles["login-page-content"]}>
          <form onSubmit={handleLogin} className={styles["form"]}>
            <div>
              <p className={styles["form-label"]}>
                Re-enter your email for secure access
              </p>
              <EmailInput val={email} fn={handleChange} isError={isError} />
              {isError && (
                <p className={styles["form-error-msg"]}>
                  {errorMessage} Click{" "}
                  <a
                    href="http://localhost:3000/login"
                    className={styles["form-error-msg-link"]}
                  >
                    here
                  </a>{" "}
                  to login
                </p>
              )}
            </div>
            <button type="submit" className={styles["form-btn"]}>
              <LoginIcon color={"#fff"} size={20} />
              Login
            </button>
          </form>
        </div>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        {isLoading && <Loader />}
      </>
    </div>
  );
}

export default LoginWithLink;
