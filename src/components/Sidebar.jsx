import Link from "next/link";
import Image from "next/legacy/image";
import styles from "../scss/sidebar.module.scss";
import { usePathname } from "next/navigation";

export const Sidebar = ({ onClose, isOpen }) => {
  const pathname = usePathname();
  return (
    <div className={isOpen ? styles["sidebar"] : styles["sidebar--closed"]}>
      <div
        className={
          isOpen ? styles["sidebar-overlay"] : styles["sidebar-overlay--closed"]
        }
        onClick={onClose}
      ></div>
      <div
        className={
          isOpen ? styles["sidebar-menu"] : styles["sidebar-menu--closed"]
        }
      >
        <Link
          href="/"
          className={styles["sidebar-menu-logo"]}
          onClick={onClose}
        >
          <Image
            src="/blossom-reads-logo.webp"
            alt="Logo"
            width="70"
            height="73"
            priority={true}
          />
        </Link>
        <nav className={styles["sidebar-menu-nav"]}>
          {pathname !== "/" && (
            <Link
              href="/"
              className={styles["sidebar-menu-nav-link"]}
              onClick={onClose}
            >
              Home
            </Link>
          )}
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
