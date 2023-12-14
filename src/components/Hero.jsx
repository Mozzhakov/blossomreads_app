import Link from "next/link";
import styles from "../scss/hero.module.scss";
import { ReviewIcon } from "./Icons";

export default function Hero({ orders }) {
  const paidOrders = orders.filter(
    (el) => el.status === "paid" || el.status === "queued"
  );
  const convertDate = (date) => {
    return new Date(date).getTime();
  };
  const sortedOrders = paidOrders.sort(
    (a, b) => convertDate(a.created_at) - convertDate(b.created_at)
  );
  const earliestOrder = sortedOrders[sortedOrders.length - 1];

  return (
    <>
      <section className={styles["hero-section"]}>
        <div className={styles.container}>
          <h1 className={styles["hero-title"]}>Welcome to your Story Hub</h1>
          <p className={styles["hero-text"]}>
            Preview and personalize your unique Storybook Adventures
          </p>
          <div className={styles["hero-btn-wrapper"]}>
            <Link
              href={earliestOrder ? `/order/${earliestOrder.order_id}` : "/"}
              className={
                earliestOrder
                  ? styles["hero-btn"]
                  : styles["hero-btn--disabled"]
              }
            >
              <ReviewIcon
                color={"#fff"}
                size={20}
                style={styles["hero-btn-image"]}
              />
              Start reviewing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
// style={{ color: "#f0623d" }}
