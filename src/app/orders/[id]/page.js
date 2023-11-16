"use client";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStories } from "@/redux/stories/stories-operations";
import { getOrders, getStories, getUser } from "@/redux/selectors";

import StoryListComponent from "@/components/StoryList";
import styles from "../../../scss/story-list.module.scss";

export default function StoryPage({ params }) {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  const orders = useSelector(getOrders);
  const currentOrder = orders.find((el) => el.order_id === Number(params.id));

  useEffect(() => {
    if (user && user.stsTokenManager.expirationTime > Date.now()) {
      dispatch(fetchStories({ id: params.id, token: user.accessToken }));
    }
  }, [user, dispatch, params]);

  const stories = useSelector(getStories);

  return (
    <section className={styles["story-list-section"]}>
      <h1 className={styles["story-list-title"]}>
        <span className={styles["story-list-title-part"]}>
          {currentOrder.hero_name}
        </span>{" "}
        stories
      </h1>
      {stories && <StoryListComponent stories={stories} params={params} />}
    </section>
  );
}
