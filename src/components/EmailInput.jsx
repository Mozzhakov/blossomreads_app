import styles from "../scss/email-input.module.scss";

export const EmailInput = ({ fn, val, isError, label = "Email" }) => {
  return (
    <div className={styles["input-wrapper"]}>
      <input
        autoComplete="on"
        className={isError ? styles["input-error"] : styles["input"]}
        type="email"
        id="email"
        placeholder="example@mail.com"
        value={val}
        onChange={fn}
      />
      <label
        className={isError ? styles["label-error"] : styles["label"]}
        htmlFor="email"
      >
        {label}
      </label>
    </div>
  );
};
