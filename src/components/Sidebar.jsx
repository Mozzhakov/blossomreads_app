import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "../scss/sidebar.module.scss";

export const Sidebar = ({ onClose, open }) => {
  return (
    <div className={styles["sidebar"]}>
      <div className={styles["sidebar-overlay"]} onClick={onClose}></div>
      <div className={styles["sidebar-menu"]}>
        <Link
          href="/"
          className={styles["sidebar-menu-logo"]}
          onClick={onClose}
        >
          <Image src="/stastiem-logo.webp" alt="Logo" width="70" height="42" />
        </Link>
        <nav className={styles["sidebar-menu-nav"]}>
          <Link
            href="/help"
            className={styles["sidebar-menu-nav-link"]}
            onClick={onClose}
          >
            Help
          </Link>
          <Link
            href="/feedback"
            className={styles["sidebar-menu-nav-link"]}
            onClick={onClose}
          >
            Send feedback
          </Link>
          <Link
            href="/terms-and-policy"
            className={styles["sidebar-menu-nav-link"]}
            onClick={onClose}
          >
            Terms & Policy
          </Link>
        </nav>
      </div>
    </div>
  );
};
