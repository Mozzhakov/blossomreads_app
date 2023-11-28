"use client";
// import Link from "next/link";
// import Image from "next/image";
import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStories } from "@/redux/stories/stories-operations";
import { getOrders } from "@/redux/orders/orders-selectors";
import {
  getStories,
  getIsStoryError,
  getStoryError,
} from "@/redux/stories/stories-selectors";
import { Suspense } from "react";
import { useNotify } from "@/hooks/useNotify";
import StoryListComponent from "@/components/StoryList";
import styles from "../../../scss/story-list.module.scss";
import PrivateRoute from "@/components/PrivateRoute";

function StoryPage({ params }) {
  const { showFailure } = useNotify();
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  const currentOrder = orders.find((el) => el.order_id === Number(params.id));

  useEffect(() => {
    if (user && user.stsTokenManager.expirationTime > Date.now()) {
      dispatch(fetchStories({ id: params.id, token: user.accessToken }));
    }
  }, [user, dispatch, params]);

  const stories = useSelector(getStories);
  const isStoryError = useSelector(getIsStoryError);
  const storyErrorMessage = useSelector(getStoryError);

  useEffect(() => {
    if (isStoryError) {
      showFailure(storyErrorMessage);
    }
  }, [isStoryError, showFailure, storyErrorMessage]);

  const cover = stories.find((el) => {
    return el.is_cover === true;
  });

  return (
    <PrivateRoute>
      <section className={styles["story-list-section"]}>
        {currentOrder ? (
          <>
            <h1 className={styles["story-list-title"]}>
              <span className={styles["story-list-title-part"]}>
                {cover && cover.story_title.split(" ")[0]}
              </span>{" "}
              {cover && cover.story_title.split(" ")[1]}
            </h1>

            <Suspense fallback={<p>Loading stories...</p>}>
              <StoryListComponent stories={stories} params={params} />
            </Suspense>
          </>
        ) : (
          <p>There is no order with id {params.id} </p>
        )}
      </section>
    </PrivateRoute>
  );
}

export default StoryPage;
