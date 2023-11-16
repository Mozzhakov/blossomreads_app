"use client";

import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { StoryHeader } from "./StoryHeader";
import { MenuIcon, ProfileIcon } from "./Icons";
import { BackLink } from "./BackBtn";
import Link from "next/link";
import Image from "next/image";
import styles from "../scss/header.module.scss";

function Header() {
  const [user] = useAuthState(auth);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return pathname.includes("stories") ? (
    <StoryHeader />
  ) : (
    <header className={styles.header}>
      {pathname === "/" ? (
        <button className={styles["header-menu-btn"]} onClick={toggle}>
          <MenuIcon
            color={"#f0623d"}
            size={window.innerWidth > 768 ? 30 : 25}
          />
        </button>
      ) : (
        <BackLink path={"/"} />
      )}
      <Link href="/" className={styles.logo}>
        <Image src="/stastiem-logo.webp" alt="Logo" width="70" height="42" />
      </Link>
      {user && (
        <Link className={styles["header-profile-btn"]} href="/profile">
          <ProfileIcon
            color={"#f0623d"}
            size={window.innerWidth > 768 ? 30 : 25}
          />
        </Link>
      )}
      {isOpen && <Sidebar onClose={toggle} />}
    </header>
  );
}

export default Header;
