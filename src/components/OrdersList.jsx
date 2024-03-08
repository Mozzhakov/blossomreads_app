import Link from "next/link";
import Image from "next/legacy/image";
import styles from "../scss/order-list.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageLoader, Loader } from "./Loader";
import { fetchOrdersAndStories } from "@/redux/orders/orders-operations";
import { getOrders } from "@/redux/orders/orders-selectors";

export default function OrderList({ user, loading }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (user && user.stsTokenManager.expirationTime > Date.now()) {
  //       // Fetch orders
  //       const ordersPromise = await dispatch(fetchOrders(user.accessToken));
  //       const orders = ordersPromise.payload;

  //       // Filter orders
  //       const filteredOrders =
  //         orders &&
  //         orders.filter((order) =>
  //           ["created", "queued", "paid"].includes(order.status)
  //         );
  //       if (filteredOrders.length === 0) {
  //         return setIsLoading(false);
  //       }
  //       // Fetch stories based on filtered orders
  //       const ordersWithStories = await Promise.all(
  //         filteredOrders.map(async (order) => {
  //           const storiesPromise = await dispatch(
  //             fetchStories({
  //               id: Number(order.order_id),
  //               token: user.accessToken,
  //             })
  //           );
  //           const stories = storiesPromise.payload;
  //           setIsLoading(false);
  //           return {
  //             ...order,
  //             stories,
  //           };
  //         })
  //       );
  //       // console.log(ordersWithStories);
  //       localStorage.setItem("orders", JSON.stringify(ordersWithStories));

  //       // Sort orders with stories
  //       const sortedOrders = ordersWithStories.sort((a, b) => {
  //         const statusPriority = { paid: 1, queued: 2, created: 3 };
  //         const statusA = statusPriority[a.status];
  //         const statusB = statusPriority[b.status];

  //         if (statusA === statusB) {
  //           return new Date(a.created_at) - new Date(b.created_at);
  //         }

  //         return statusA - statusB;
  //       });

  //       setRelevantOrders(sortedOrders);
  //     }
  //   };

  //   if (user) {
  //     fetchData();
  //   }
  // }, [dispatch, user]);

  useEffect(() => {
    if (user && user.stsTokenManager.expirationTime > Date.now()) {
      dispatch(fetchOrdersAndStories(user));
      setIsLoading(false);
    }
  }, [dispatch, user]);

  const orders = useSelector(getOrders);

  return (
    <section className={styles["order-list-section"]}>
      <div className={styles.container}>
        {orders && orders.length !== 0 && !isLoading && (
          <>
            <h1 className={styles["order-list-title"]}>
              Your Blossom Reads books
            </h1>
            <ul className={styles["order-list"]}>
              {orders.map((el) => (
                <li key={el.order_id} className={styles["order-item"]}>
                  <Link href={`/order/${el.order_id}`}>
                    {el.stories.left_image_optimized ? (
                      <div className={styles["order-item-image-wrap"]}>
                        <Image
                          src={el.stories.left_image_optimized}
                          alt={el.hero_name}
                          width={300}
                          className={styles["order-item-image"]}
                          priority="false"
                          onLoad={() => setIsImageLoading(false)}
                        />
                        {isImageLoading && <ImageLoader />}
                      </div>
                    ) : (
                      <div className={styles["order-item-image-wrap"]}>
                        <span className={styles["order-item-image-ph"]}>
                          {el.stories[el.stories.length - 1].story_title}
                        </span>
                      </div>
                    )}
                  </Link>
                  <div className={styles["order-item-date"]}>
                    <span>{formatDate(el.created_at)}</span>
                    {el.stories && el.stories.length > 0 && (
                      <span>In progress</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {isLoading && <Loader />}
        {!orders && !isLoading && !loading && (
          <h4 className={styles["order-list-title"]}>
            You don&#39;t have orders. You can place new order{" "}
            <Link
              href="https://www.stastiem.com/order"
              style={{ color: "#f0623d", textDecoration: "underline" }}
              target="_blank"
            >
              here
            </Link>
          </h4>
        )}
      </div>
    </section>
  );
}

{
}
