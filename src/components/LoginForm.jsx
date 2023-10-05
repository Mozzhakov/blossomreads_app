"use client";

import styles from "../styles/loginForm.module.css";

function LoginForm({ handleLogin, email, setEmail }) {
  return (
    <>
      <h1>To get access to your profile please enter your email</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.formInput}
        />
        <button type="submit" className={styles.formBtn}>
          LOGIN
        </button>
      </form>
    </>
  );
}

export default LoginForm;
