import React from "react";
import { getStories } from "@/redux/stories/stories-selectors";
import { useState } from "react";
import { useSelector } from "react-redux";
import { StoryEditingModal } from "./StoryEditingModal";
import { useSwipeable } from "react-swipeable";
import {
  LeftArrowIcon,
  RightArrowIcon,
  EditIcon,
  BackIcon,
} from "@/components/Icons";
import styles from "../scss/story-details.module.scss";

export const StoryModal = ({ order_id, story_number, onClose, prev, next }) => {
  const stories = useSelector(getStories);
  const [editingMode, setEditionMode] = useState(false);

  const currentStory = stories.find(
    (el) => el.story_number === Number(story_number)
  );

  function TextComponent(text) {
    const lines = text.split("\n");
    return (
      <>
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </>
    );
  }

  let storyText = TextComponent(currentStory.story_text);

  const closeEditingMode = () => {
    setEditionMode(false);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  return (
    <>
      <div className={styles["story-overlay"]} onClick={onClose}></div>
      <div className={styles["story-modal"]}>
        <div className={styles["story-top-nav"]}>
          <button
            className={
              editingMode
                ? styles["story-back-btn--disabled"]
                : styles["story-back-btn"]
            }
            onClick={onClose}
          >
            <BackIcon
              color={editingMode ? "rgba(16, 16, 16, 0.3)" : "#3b444b"}
              size={25}
            />
            back
          </button>
          <div className={styles["story-nav-btn-wrap"]}>
            <button
              onClick={prev}
              className={
                currentStory.story_number > 1 && !editingMode
                  ? styles["story-nav-btn"]
                  : styles["story-nav-btn--disabled"]
              }
            >
              <LeftArrowIcon
                color={
                  currentStory.story_number > 1 && !editingMode
                    ? "#3b444b"
                    : "rgba(16, 16, 16, 0.3)"
                }
                size={22}
              />
              prev
            </button>
            <button
              onClick={next}
              className={
                currentStory.story_number < 6 && !editingMode
                  ? styles["story-nav-btn"]
                  : styles["story-nav-btn--disabled"]
              }
            >
              <RightArrowIcon
                color={
                  currentStory.story_number < 6 && !editingMode
                    ? "#3b444b"
                    : "rgba(16, 16, 16, 0.3)"
                }
                size={22}
              />
              next
            </button>
          </div>
        </div>
        <div className={styles["story-content"]} {...handlers}>
          <h3 className={styles["story-title"]}>
            {currentStory.story_number}. {currentStory.story_title}
          </h3>
          {editingMode ? (
            <StoryEditingModal
              order_id={order_id}
              story_id={currentStory.story_number}
              story_title={currentStory.story_title}
              story_text={currentStory.story_text}
              onClose={closeEditingMode}
            />
          ) : (
            <>
              <p className={styles["story-text"]}>{storyText}</p>
              <button
                className={styles["story-edit-btn"]}
                onClick={() => setEditionMode(true)}
              >
                <EditIcon color={"#3b444b"} size={20} />
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
