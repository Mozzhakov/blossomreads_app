"use client";
import { LoginIcon, WarningIcon } from "./Icons";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";
import {
  getIsAuthError,
  getAuthError,
  getIsEmailSent,
  getIsLoading,
} from "@/redux/auth/auth-selectors";
import loginImage from "../images/Login-image.webp";
import styles from "../scss/login-form.module.scss";
import Image from "next/legacy/image";
import { EmailSentSuccess } from "./EmailSentSuccess";
import { EmailInput } from "./EmailInput";

function LoginWithoutLink({ handleLogin, email, setEmail }) {
  const isError = useSelector(getIsAuthError);
  const errorMessage = useSelector(getAuthError);
  const isEmailSent = useSelector(getIsEmailSent);
  const isLoading = useSelector(getIsLoading);

  const handleChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
  };

  return (
    <div className={styles["login-page"]}>
      {isEmailSent ? (
        <EmailSentSuccess email={email} styles={styles} />
      ) : (
        <>
          <h1 className={styles["login-page-title"]}>
            Enter your magical book journey
          </h1>
          <div className={styles["login-page-content"]}>
            <form onSubmit={handleLogin} className={styles["form"]}>
              <div>
                <h2 className={styles["form-title"]}>Step inside</h2>
                <p className={styles["form-subtitle"]}>
                  Simply enter your email to continue your adventure
                </p>
              </div>
              <div className={styles["form-input-wrapper"]}>
                <EmailInput val={email} fn={handleChange} isError={isError} />
                {isError && (
                  <p className={styles["form-error-msg"]}>
                    <WarningIcon size={20} />
                    {errorMessage}
                  </p>
                )}
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
              height={500}
              className={styles["form-image"]}
              priority={true}
            />
          </div>
        </>
      )}
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      {isLoading && <Loader />}
    </div>
  );
}

export default LoginWithoutLink;
