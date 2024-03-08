import Image from "next/legacy/image";
import styles from "../scss/story-list.module.scss";
import { useState } from "react";
import { StoryModal } from "@/components/StoryModal";
import { ImageLoader } from "./Loader";
import { Portal } from "./Modal";
import Link from "next/link";
export default function StoryList({ stories, params }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currStory, setCurrStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const goToPrev = () => {
    currStory > 1 ? setCurrStory((currStory) => currStory - 1) : null;
  };

  const goToNext = () => {
    currStory < 6 ? setCurrStory((currStory) => currStory + 1) : null;
  };
  const orderNumber = params.id;
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
  const relevantStories = stories.slice(0, -1);
  return (
    <>
      {relevantStories && (
        <ol className={styles["story-list"]}>
          {relevantStories.map((story, index) => (
            <li
              key={story.story_number}
              className={index % 2 === 0 ? styles["even"] : styles["odd"]}
              onClick={() => {
                setCurrStory(story.story_number);
                setModalOpen(true);
              }}
            >
              <Link
                href={`/order/${orderNumber}/story/${story.story_number}`}
                className={styles["story-item"]}
              >
                {index % 2 === 0 ? (
                  <>
                    <div className={styles["story-item-content"]}>
                      <p className={styles["story-item-title"]}>
                        {story.story_number}. {story.story_title}
                      </p>
                      <p className={styles["story-item-text"]}>
                        {window.innerWidth > 768
                          ? truncatedString(
                              story.story_text,
                              600,
                              <span className={styles["story-item-btn"]}>
                                more
                              </span>
                            )
                          : truncatedString(
                              story.story_text,
                              300,
                              <span className={styles["story-item-btn"]}>
                                more
                              </span>
                            )}
                      </p>
                    </div>
                    <div className={styles["story-item-image-wrap"]}>
                      {story.right_image_optimized ? (
                        <Image
                          src={story.right_image_optimized}
                          alt="Story cover"
                          width={400}
                          height={400}
                          className={styles["story-item-image"]}
                          priority={true}
                          onLoad={() => setIsLoading(false)}
                        />
                      ) : (
                        <div
                          className={styles["story-item-image-ph"]}
                          style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
                        >
                          <p className={styles["story-item-image-ph-text"]}>
                            {story.story_title}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles["story-item-image-wrap"]}>
                      {story.right_image_optimized ? (
                        <Image
                          src={story.right_image_optimized}
                          alt="Story cover"
                          width={400}
                          height={400}
                          className={styles["story-item-image"]}
                          priority={true}
                          onLoad={() => setIsLoading(false)}
                        />
                      ) : (
                        <div
                          className={styles["story-item-image-ph"]}
                          style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
                        >
                          <p className={styles["story-item-image-ph-text"]}>
                            {story.story_title}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={styles["story-item-content"]}>
                      <p className={styles["story-item-title"]}>
                        {story.story_number}. {story.story_title}
                      </p>
                      <p className={styles["story-item-text"]}>
                        {window.innerWidth > 768
                          ? truncatedString(
                              story.story_text,
                              600,
                              <span className={styles["story-item-btn"]}>
                                more
                              </span>
                            )
                          : truncatedString(
                              story.story_text,
                              300,
                              <span className={styles["story-item-btn"]}>
                                more
                              </span>
                            )}
                      </p>
                    </div>
                  </>
                )}
              </Link>
            </li>
          ))}
        </ol>
      )}
      {modalOpen && (
        <Portal>
          <StoryModal
            stories={stories}
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
