import { SuccessIcon } from "./Icons";
export const EmailSentSuccess = ({ email, styles }) => {
  return (
    <div className={styles["success-box"]}>
      <div className={styles["success-box__icon-wrap"]}>
        <SuccessIcon color={"yellowgreen"} size={50} />
        <h1 className={styles["success-box__title"]}>Success!</h1>
      </div>
      <p className={styles["success-box__content"]}>
        An email has been sent to{" "}
        <span className={styles["success-box__email"]}>{email}</span>.<br />{" "}
        Please check your inbox and follow the instructions provided to complete
        the process.
      </p>
      <p className={styles["success-box__content"]}>
        If you don&#39;t see the email in your inbox, please check your spam
        folder. If you encounter any issues, feel free to contact our support
        team at{" "}
        <a
          href={"mailto:support@stastiem.com"}
          className={styles["success-box__link"]}
        >
          support@stastiem.com
        </a>
        .
      </p>
    </div>
  );
};
