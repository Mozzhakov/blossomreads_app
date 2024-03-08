import Link from "next/link";
import Header from "./Header";
import styles from "../scss/not-found.module.scss";

export const NotFound = ({ order_id }) => {
  return (
    <>
      <Header />
      <div className={styles["not-found-page"]}>
        <h1 className={styles["not-found-title"]}>404</h1>
        <h2 className={styles["not-found-subtitle"]}>
          Story not found for the specified story number.
        </h2>
        <Link href={`/order/${order_id}`} className={styles["not-found-link"]}>
          Go back to the stories
        </Link>
      </div>
    </>
  );
};
