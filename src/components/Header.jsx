import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { MenuIcon, ProfileIcon } from "./Icons";
import Link from "next/link";
import Image from "next/legacy/image";
import styles from "../scss/header.module.scss";

function Header({ onOpen }) {
  const [user] = useAuthState(auth);
  return (
    <div className={styles["header-wrap"]}>
      <header className={styles.header}>
        <button
          className={styles["header-menu-btn"]}
          onClick={onOpen}
          aria-label="Menu button"
        >
          <MenuIcon
            color={"#3b444b"}
            size={window.innerWidth > 768 ? 30 : 25}
          />
        </button>
        <Link href="/" className={styles.logo}>
          <Image
            src="/blossom-reads-logo-2.webp"
            alt="Logo"
            width="70"
            height="37"
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
          aria-label="Link to the profile page"
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
