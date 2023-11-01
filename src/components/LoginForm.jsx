"use client";

import styles from "../styles/loginForm.module.css";

function LoginForm({ handleLogin, email, setEmail }) {
  return (
    <>
      <h1>Please provide your email to get access to your profile.</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.formTitle}>LOGIN</h2>
        <label htmlFor="email" className={styles.formLabel}>
          Email*
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formInput}
          />
        </label>

        <button type="submit" className={styles.formBtn}>
          LOGIN
        </button>
      </form>
    </>
  );
}

export default LoginForm;
