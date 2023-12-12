import { useState } from "react";
export const EmailSentSuccess = ({ email, styles }) => {
  const [userEmail, setUserEmail] = useState(email);
  return (
    <div className={styles["success-box"]}>
      <div className={styles["success-box__icon-wrap"]}>
        <h1 className={styles["success-box__title"]}>📩 Email Sent!</h1>
      </div>
      <p className={styles["success-box__content"]}>
        ✨ A login link has been sent to{" "}
        <span className={styles["success-box__email"]}>{userEmail}</span>. Click
        it to access your Stastiem world!
      </p>
      <p className={styles["success-box__content"]}>
        🔎 Can’t see it? Check your Spam folder or contact us at{" "}
        <a
          href={"mailto:support@stastiem.com"}
          className={styles["success-box__link"]}
        >
          support@stastiem.com
        </a>{" "}
        for assistance.
      </p>
    </div>
  );
};
