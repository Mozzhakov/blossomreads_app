"use client";
import { LoginIcon, WarningIcon } from "./Icons";
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
  const isError = useSelector(getIsAuthError);
  const errorMessage = useSelector(getAuthError);
  const isLoading = useSelector(getIsLoading);

  const handleChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
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
                  <WarningIcon size={20} />
                  {errorMessage}
                  <a
                    href="https://app.blossomreads.com/login"
                    className={styles["form-error-msg-link"]}
                  >
                    Click here to login
                  </a>
                </p>
              )}
            </div>
            <button type="submit" className={styles["form-btn"]}>
              <LoginIcon color={"#fff"} size={20} />
              Login
            </button>
          </form>
        </div>
        {isLoading && <Loader />}
      </>
    </div>
  );
}

export default LoginWithLink;
