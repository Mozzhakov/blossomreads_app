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
  function sortedOrders(orders) {
    const filteredOrders = orders.filter((order) =>
      ["created", "queued", "paid"].includes(order.status)
    );

    const sortedOrders = filteredOrders.sort((a, b) => {
      // Sort by status priority
      const statusPriority = { paid: 1, queued: 2, created: 3 };
      const statusA = statusPriority[a.status];
      const statusB = statusPriority[b.status];

      // If statuses are equal, sort by created_at in ascending order
      if (statusA === statusB) {
        return new Date(a.created_at) - new Date(b.created_at);
      }

      // Sort by status priority
      return statusA - statusB;
    });

    return sortedOrders;
  }
  return (
    <section className={styles["order-list-section"]}>
      <div className={styles.container}>
        {orders && orders.length === 0 ? (
          <h4 className={styles["order-list-title"]}>
            You don&#39;t have orders. You can make new order{" "}
            <Link
              href="https://www.stastiem.com/order"
              style={{ color: "#f0623d", textDecoration: "underline" }}
              target="_blanc"
            >
              here
            </Link>
          </h4>
        ) : (
          <h4 className={styles["order-list-title"]}>Your Stastiem books</h4>
        )}
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
              <div className={styles["order-item-date"]}>
                <span>{formatDate(el.created_at)}</span>
                <span>In progress</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
