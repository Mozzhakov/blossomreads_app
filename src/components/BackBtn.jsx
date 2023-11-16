import { BackIcon } from "./Icons";
import Link from "next/link";
import styles from "../scss/header.module.scss";

export const BackLink = ({ path = "#" }) => {
  return (
    <Link href={path} className={styles["header-back-btn"]}>
      <BackIcon color={"#F0623d"} size={25} />
      back
    </Link>
  );
};

export const BackBtn = ({ action }) => {
  return (
    <button className={styles["header-back-btn"]} onClick={action}>
      <BackIcon color={"#F0623d"} size={25} />
      back
    </button>
  );
};
