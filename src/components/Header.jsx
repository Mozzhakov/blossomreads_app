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

function Header({ onOpen }) {
  const [user] = useAuthState(auth);
  // const pathname = usePathname();
  // const [isOpen, setIsOpen] = useState(false);
  // const openSidebar = () => {
  //   setIsOpen(true);
  // };
  // const closeSidebar = () => {
  //   setIsOpen(false);
  // };
  return (
    <div className={styles["header-wrap"]}>
      <header className={styles.header}>
        <button className={styles["header-menu-btn"]} onClick={onOpen}>
          <MenuIcon
            color={"#3b444b"}
            size={window.innerWidth > 768 ? 30 : 25}
          />
        </button>
        <Link href="/" className={styles.logo}>
          <Image
            src="/stastiem-logo.webp"
            alt="Logo"
            width="70"
            height="42"
            priority={true}
          />
        </Link>
        <Link
          className={
            user
              ? styles["header-profile-btn"]
              : styles["header-profile-btn--hidden"]
          }
          href="/profile"
        >
          <ProfileIcon
            color={"#3b444b"}
            size={window.innerWidth > 768 ? 30 : 25}
          />
        </Link>
      </header>
    </div>
  );
}

export default Header;
