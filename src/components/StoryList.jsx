import Link from "next/link";
import Image from "next/image";
import cover from "../images/order-placeholder.png";
import styles from "../scss/story-list.module.scss";
import { useState } from "react";
import { StoryModal } from "@/components/StoryModal";
import { Portal } from "./Modal";

export default function StoryListComponent({ stories, params }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currStory, setCurrStory] = useState(null);

  const goToPrev = () => {
    setCurrStory((currStory) => currStory - 1);
  };

  const goToNext = () => {
    setCurrStory((currStory) => currStory + 1);
  };

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
    <>
      {stories && (
        <ol className={styles["story-list"]}>
          {stories.map((story) => (
            <li
              key={story.story_number}
              className={styles["story-item"]}
              onClick={() => {
                setCurrStory(story.story_number);
                setModalOpen(true);
              }}
            >
              <Image
                src={cover}
                alt="Story cover"
                width={280}
                className={styles["story-item-image"]}
                priority={false}
              />
              <div className={styles["story-item-content"]}>
                <p className={styles["story-item-title"]}>
                  {story.story_number}. {story.story_title}
                </p>
                {window.innerWidth > 768 ? (
                  <p className={styles["story-item-text"]}>
                    {truncatedString(
                      story.story_text,
                      600,
                      <span className={styles["story-item-btn"]}>more</span>
                    )}
                  </p>
                ) : (
                  <p className={styles["story-item-text"]}>
                    {truncatedString(
                      story.story_text,
                      300,
                      <span className={styles["story-item-btn"]}>more</span>
                    )}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
      {modalOpen && (
        <Portal>
          <StoryModal
            order_id={params.id}
            story_number={currStory}
            onClose={() => setModalOpen(false)}
            prev={() => goToPrev()}
            next={() => goToNext()}
          />
        </Portal>
      )}
    </>
  );
}
