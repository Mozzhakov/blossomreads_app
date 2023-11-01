"use client";

import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import styles from "../styles/header.module.scss";
import styles from "../scss/header.module.scss";
import menu from "../images/burger-menu.svg";

function Header() {
  const [user] = useAuthState(auth);
  // function handleLogout() {
  //   signOut(auth)
  //     .then(() => {})
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className={styles.header}>
      <button className={styles["header-menu-btn"]} onClick={toggle}>
        <Image src={menu} alt="menu" width="25" height="25" />
      </button>
      <Link href="/" className={styles.logo}>
        <Image src="/stastiem-logo.webp" alt="Logo" width="70" height="42" />
      </Link>
      {user && (
        <Link className={styles["header-profile-btn"]} href="/">
          JM
        </Link>
      )}
      {isOpen && <Sidebar onClose={toggle} />}
    </header>
  );
}

export default Header;
