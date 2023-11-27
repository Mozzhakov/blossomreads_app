"use client";

import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
// import { StoryHeader } from "./StoryHeader";
import { getAuth, signOut } from "firebase/auth";
import { MenuIcon, ProfileIcon } from "./Icons";
import { BackLink } from "./BackBtn";
import { Portal } from "./Modal";
import Link from "next/link";
import Image from "next/image";
import styles from "../scss/header.module.scss";

function Header() {
  const firebase_auth = getAuth();
  const onLogoutClick = () => {
    signOut(firebase_auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };
  const [user] = useAuthState(auth);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles["header-wrap"]}>
      <header className={styles.header}>
        {/* {pathname === "/" || pathname.includes("/login") ? ( */}
        <button className={styles["header-menu-btn"]} onClick={toggle}>
          <MenuIcon
            color={"#3b444b"}
            size={window.innerWidth > 768 ? 30 : 25}
          />
        </button>
        {/* ) : (
          <BackLink path={"/"} />
        )} */}
        <Link href="/" className={styles.logo}>
          <Image
            src="/stastiem-logo.webp"
            alt="Logo"
            width="70"
            height="42"
            priority="false"
          />
        </Link>
        <Link className={styles["header-profile-btn"]} href="/profile">
          <ProfileIcon
            color={"#3b444b"}
            size={window.innerWidth > 768 ? 30 : 25}
          />
        </Link>
        {isOpen && (
          <Portal>
            <Sidebar onClose={toggle} />
          </Portal>
        )}
      </header>
    </div>
  );
}

export default Header;
