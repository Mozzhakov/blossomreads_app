import Link from "next/link";
import styles from "../scss/hero.module.scss";
import { ReviewIcon } from "./Icons";

export default function Hero({ orders }) {
  const paidOrders = orders.filter(
    (el) => el.status === "paid" || el.status === "queued"
  );
  const sortedOrders = paidOrders.sort(
    (a, b) => convertDate(a.created_at) - convertDate(b.created_at)
  );
  const earliestOrder = sortedOrders[sortedOrders.length - 1];

  return (
    <>
      <section className={styles["hero-section"]}>
        <div className={styles.container}>
          <h1 className={styles["hero-title"]}>
            Crafting magic: Edit your child&#39;s adventure
          </h1>
          <p className={styles["hero-text"]}>
            Edit, personalize, and cherish each page of your child&#39;s tale,
            crafting a one-of-a-kind story that reflects their unique magic.
            With our intuitive tools, every detail becomes a cherished memory in
            the enchanting adventure you create together.
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
