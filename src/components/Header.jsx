"use client";

import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/stastiem-logo.webp";
import styles from "../styles/header.module.css";

function Header() {
  const [user] = useAuthState(auth);
  function handleLogout() {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <header className={styles.header}>
      <Link href="/" className="logo">
        <Image src={logo} alt="Logo" width={70} height={42} />
      </Link>
      <nav>
        <div>
          <Link href="https://www.stastiem.com/">Statiem site</Link>
        </div>
      </nav>
      {user && <button onClick={handleLogout}>Logout</button>}
    </header>
  );
}

export default Header;
