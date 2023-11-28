// import LoginForm from "./LoginForm";
import Link from "next/link";
import Image from "next/image";
// import info from "../images/info-circle.svg";
import review from "../images/review.svg";
import styles from "../scss/hero.module.scss";
import { ReviewIcon } from "./Icons";
import { useSelector } from "react-redux";
import { getOrders } from "@/redux/orders/orders-selectors";

export default function Hero({ orders }) {
  function convertDate(date) {
    return new Date(date).getTime();
  }

  const paidOrders = orders.filter((el) => el.status === "paid");
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
            {orders ? (
              <Link
                href={earliestOrder ? `/orders/${earliestOrder.order_id}` : "/"}
                className={styles["hero-btn-primary"]}
              >
                <ReviewIcon
                  color={"#fff"}
                  size={20}
                  style={styles["hero-btn-image"]}
                />
                Start reviewing
              </Link>
            ) : (
              <Link href={"/"} className={styles["hero-btn-primary"]}>
                <Image
                  src={review}
                  alt="Review icon"
                  className={styles["hero-btn-image"]}
                  // style={{ visibility: "hidden" }}
                />
                Start reviewing
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
