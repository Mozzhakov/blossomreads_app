import Link from "next/link";
import Image from "next/image";
import cover from "../images/order-placeholder.png";
import styles from "../scss/order-list.module.scss";

export default function OrderList({ orders }) {
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const formattedDate = `${day} ${month}, ${year}`;

    return formattedDate;
  }
  return (
    orders && (
      <section className={styles["order-list-section"]}>
        <div className={styles.container}>
          <h4 className={styles["order-list-title"]}>Your Stastiem books</h4>
          <ul className={styles["order-list"]}>
            {orders.map((el) => (
              <li key={el.order_id} className={styles["order-item"]}>
                <Link href={`/orders/${el.order_id}`}>
                  <Image
                    src={cover}
                    alt={el.hero_name}
                    width={300}
                    className={styles["order-item-image"]}
                    priority="false"
                  />
                </Link>
                {/* <p className={styles["order-item-date"]}> */}
                <div className={styles["order-item-date"]}>
                  <span>{formatDate(el.created_at)}</span>
                  <span>In progress</span>
                </div>
                {/* </p> */}
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  );
}
