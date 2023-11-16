import { usePathname } from "next/navigation";
import { BackBtn } from "./BackBtn";
import Link from "next/link";
import styles from "../scss/header.module.scss";
import { LeftArrowIcon, RightArrowIcon } from "./Icons";

export const StoryHeader = () => {
  const pathname = usePathname();
  const dividedPathname = pathname.split("/");
  const currentStory = Number(dividedPathname[dividedPathname.length - 1]);
  const storiesUrl = pathname.split("/").slice(0, 3).join("/");

  function getStoryUrl(direction) {
    if (direction === "prev") {
      const prevStory = currentStory - 1;
      const prevUrlArr = [...dividedPathname.slice(0, -1), prevStory];
      return prevUrlArr.join("/");
    } else if (direction === "next") {
      const nextStory = currentStory + 1;
      const nextUrlArr = [...dividedPathname.slice(0, -1), nextStory];
      return nextUrlArr.join("/");
    } else {
      return null;
    }
  }

  return (
    <header className={styles.header}>
      <BackBtn path={storiesUrl} />
      <div className={styles["header-btn-wrapper"]}>
        <Link
          href={getStoryUrl("prev")}
          className={
            currentStory > 1
              ? styles["header-arrow"]
              : styles["header-arrow--disabled"]
          }
        >
          <LeftArrowIcon
            color={currentStory > 1 ? "#f0623d" : "grey"}
            size={25}
          />
          prev
        </Link>
        <Link
          href={getStoryUrl("next")}
          className={
            currentStory < 6
              ? styles["header-arrow"]
              : styles["header-arrow--disabled"]
          }
        >
          <RightArrowIcon
            color={currentStory < 6 ? "#f0623d" : "grey"}
            size={25}
          />
          next
        </Link>
      </div>
    </header>
  );
};
