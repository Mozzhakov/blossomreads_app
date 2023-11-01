"use client";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStories } from "@/redux/stories/stories-operations";
import { getOrders, getStories, getUser } from "@/redux/selectors";
import styles from "../../../scss/story-list.module.scss";
import image from "../../../images/order-placeholder.png";

export default function StoryList({ params }) {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  const orders = useSelector(getOrders);
  const currentOrder = orders.find((el) => el.order_id === Number(params.id));

  useEffect(() => {
    if (user) {
      dispatch(fetchStories({ id: params.id, token: user.accessToken }));
    }
  }, [user, dispatch, params.id]);

  const stories = useSelector(getStories);

  const truncatedString = (str, maxLength, link) => {
    if (str.length <= maxLength) {
      return str;
    } else {
      return (
        <>
          {str.slice(0, maxLength)}
          ...
          {link}
        </>
      );
    }
  };
  return (
    <section className={styles["story-list-section"]}>
      <h1 className={styles["story-list-title"]}>
        <span className={styles["story-list-title-part"]}>
          {currentOrder.hero_name}
        </span>{" "}
        stories
      </h1>
      {stories && (
        <ol className={styles["story-list"]}>
          {stories.map((story) => (
            <li key={story.story_number} className={styles["story-item"]}>
              <Link href={`/orders/${params.id}/stories/${story.story_number}`}>
                <Image
                  src={image}
                  alt="Story cover"
                  width={280}
                  className={styles["story-item-image"]}
                />
                <p className={styles["story-item-title"]}>
                  {story.story_number}. {story.story_title}
                </p>
                <p className={styles["story-item-text"]}>
                  {truncatedString(
                    story.story_text,
                    200,
                    <span className={styles["story-item-btn"]}>more</span>
                  )}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
