"use client";
import { Loader } from "@/components/Loader";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStories } from "@/redux/stories/stories-operations";
import {
  getIsStoryError,
  getStoryError,
  getIsStoryLoading,
} from "@/redux/stories/stories-selectors";
import { useNotify } from "@/hooks/useNotify";
import StoryList from "@/components/StoryList";
import styles from "../../../scss/story-list.module.scss";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/Firebase";
import { SidebarContainer } from "@/components/SidebarContainer";

function StoryPage({ params }) {
  const { showFailure } = useNotify();
  const dispatch = useDispatch();
  const [stories, setStories] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.stsTokenManager.expirationTime > Date.now()) {
          const fetchedStories = await dispatch(
            fetchStories({ id: Number(params.id), token: user.accessToken })
          );
          setStories(fetchedStories.payload);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, params.id, user]);

  const isStoryError = useSelector(getIsStoryError);
  const storyErrorMessage = useSelector(getStoryError);
  const isStoryLoading = useSelector(getIsStoryLoading);

  useEffect(() => {
    if (isStoryError) {
      showFailure(storyErrorMessage);
    }
  }, [isStoryError, showFailure, storyErrorMessage]);

  const cover =
    stories &&
    stories.find((el) => {
      return el.is_cover === true;
    });

  const heroName = cover && cover.story_title.split(" ")[0];
  const bookTitle = cover && cover.story_title.split(" ")[1];

  return (
    <SidebarContainer>
      <PrivateRoute>
        <section className={styles["story-list-section"]}>
          <div className={styles.container}>
            {stories && stories.length !== 0 && (
              <>
                <h1 className={styles["story-list-title"]}>
                  <span className={styles["story-list-title-part"]}>
                    {cover && heroName}
                  </span>{" "}
                  {cover && bookTitle}
                </h1>
                <StoryList stories={stories} params={params} />
              </>
            )}
            {!isStoryLoading && stories.length === 0 && (
              <h1 className={styles["story-list-title"]}>
                Oops! No stories found for order ID {params.id}
              </h1>
            )}

            {isStoryLoading && <Loader />}
          </div>
        </section>
      </PrivateRoute>
    </SidebarContainer>
  );
}

export default StoryPage;
