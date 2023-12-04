"use client";
import { auth } from "@/firebase/Firebase";
import { Loader } from "@/components/Loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStories } from "@/redux/stories/stories-operations";
import { getOrders } from "@/redux/orders/orders-selectors";
import {
  getStories,
  getIsStoryError,
  getStoryError,
  getIsStoryLoading,
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
  }, [user, dispatch, params.id]);

  const stories = useSelector(getStories);
  const isStoryError = useSelector(getIsStoryError);
  const storyErrorMessage = useSelector(getStoryError);
  const isStoryLoading = useSelector(getIsStoryLoading);

  useEffect(() => {
    if (isStoryError) {
      showFailure(storyErrorMessage);
    }
  }, [isStoryError, showFailure, storyErrorMessage]);

  const cover = stories.find((el) => {
    return el.is_cover === true;
  });
  const heroName = cover && cover.story_title.split(" ")[0];
  const bookTitle = cover && cover.story_title.split(" ")[1];

  return (
    <PrivateRoute>
      <section className={styles["story-list-section"]}>
        <div className={styles.container}>
          {currentOrder ? (
            <>
              <h1 className={styles["story-list-title"]}>
                <span className={styles["story-list-title-part"]}>
                  {cover && heroName}
                </span>{" "}
                {cover && bookTitle}
              </h1>
              <Suspense fallback={<p>Loading stories...</p>}>
                <StoryListComponent stories={stories} params={params} />
              </Suspense>
              {isStoryLoading && <Loader />}
            </>
          ) : (
            <h1 className={styles["story-list-title"]}>
              There is no order with id {params.id}
            </h1>
          )}
        </div>
      </section>
    </PrivateRoute>
  );
}

export default StoryPage;
