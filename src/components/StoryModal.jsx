import { useState } from "react";
import { StoryEditingModal } from "./StoryEditingModal";
import { EditIcon } from "@/components/Icons";
import styles from "../scss/story-details.module.scss";

export const StoryModal = ({
  stories,
  order_id,
  story_number,
  // onClose,
  // prev,
  // next,
}) => {
  const [editingMode, setEditingMode] = useState(false);

  const currentStory =
    stories && stories.find((el) => el.story_number === story_number);
  const closeEditingMode = () => {
    setEditingMode(false);
  };
  return (
    <>
      <div className={styles["story-modal"]}>
        {/* <div className={styles["story-top-nav"]}>
          <button
            className={`${
              editingMode
                ? styles["story-back-btn--disabled"]
                : styles["story-back-btn"]
            } ${styles[swipeDirection === "right" ? "right" : "left"]}`}
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
              onClick={() => {
                setSwipeDirection("right");
                prev();
              }}
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
              onClick={() => {
                setSwipeDirection("left");
                next();
              }}
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
        </div> */}
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
            <p className={styles["story-text"]}>
              {decodeURIComponent(currentStory.story_text)}
            </p>
            <button
              className={`${styles["story-edit-btn"]} `}
              onClick={() => setEditingMode(true)}
            >
              <EditIcon color={"#3b444b"} size={20} />
              Edit
            </button>
          </>
        )}
      </div>
    </>
  );
};

// import React, { useState, useEffect } from "react";
// import { StoryEditingModal } from "./StoryEditingModal";
// import { useSwipeable } from "react-swipeable";
// import {
//   LeftArrowIcon,
//   RightArrowIcon,
//   EditIcon,
//   BackIcon,
// } from "@/components/Icons";
// import styles from "../scss/story-details.module.scss";

// export const StoryModal = ({
//   stories,
//   order_id,
//   story_number,
//   onClose,
//   prev,
//   next,
// }) => {
//   const [editingMode, setEditingMode] = useState(false);
//   const [swipeDirection, setSwipeDirection] = useState(null);

//   const currentStory =
//     stories && stories.find((el) => el.story_number === story_number);
//   const closeEditingMode = () => {
//     setEditingMode(false);
//   };

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => {
//       if (!editingMode && currentStory.story_number < 6) {
//         setSwipeDirection("left");
//         next();
//       }
//     },
//     onSwipedRight: () => {
//       if (!editingMode && currentStory.story_number > 1) {
//         setSwipeDirection("right");
//         prev();
//       }
//     },
//     onSwiped: () => {
//       // setSwipeDirection(null);
//     },
//     swipeDuration: 500,
//     preventScrollOnSwipe: false,
//     trackMouse: true,
//   });

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setSwipeDirection(null);
//     }, 200);
//     return () => clearTimeout(timeoutId);
//   }, [swipeDirection]);

//   const isMobile = window.innerWidth <= 768;

//   return (
//     <>
//       <div className={styles["story-overlay"]} onClick={onClose}></div>
//       <div className={styles["story-modal"]}>
//         <div className={styles["story-top-nav"]}>
//           <button
//             className={`${
//               editingMode
//                 ? styles["story-back-btn--disabled"]
//                 : styles["story-back-btn"]
//             } ${styles[swipeDirection === "right" ? "right" : "left"]}`}
//             onClick={onClose}
//           >
//             <BackIcon
//               color={editingMode ? "rgba(16, 16, 16, 0.3)" : "#3b444b"}
//               size={25}
//             />
//             back
//           </button>
//           <div className={styles["story-nav-btn-wrap"]}>
//             <button
//               onClick={() => {
//                 setSwipeDirection("right");
//                 prev();
//               }}
//               className={
//                 currentStory.story_number > 1 && !editingMode
//                   ? styles["story-nav-btn"]
//                   : styles["story-nav-btn--disabled"]
//               }
//             >
//               <LeftArrowIcon
//                 color={
//                   currentStory.story_number > 1 && !editingMode
//                     ? "#3b444b"
//                     : "rgba(16, 16, 16, 0.3)"
//                 }
//                 size={22}
//               />
//               prev
//             </button>
//             <button
//               onClick={() => {
//                 setSwipeDirection("left");
//                 next();
//               }}
//               className={
//                 currentStory.story_number < 6 && !editingMode
//                   ? styles["story-nav-btn"]
//                   : styles["story-nav-btn--disabled"]
//               }
//             >
//               <RightArrowIcon
//                 color={
//                   currentStory.story_number < 6 && !editingMode
//                     ? "#3b444b"
//                     : "rgba(16, 16, 16, 0.3)"
//                 }
//                 size={22}
//               />
//               next
//             </button>
//           </div>
//         </div>
//         <div
//           {...(isMobile && !editingMode ? swipeHandlers : {})}
//           className={`${styles["story-content"]} ${styles[swipeDirection]}`}
//         >
//           <h3 className={styles["story-title"]}>
//             {currentStory.story_number}. {currentStory.story_title}
//           </h3>
//           {editingMode ? (
//             <StoryEditingModal
//               order_id={order_id}
//               story_id={currentStory.story_number}
//               story_title={currentStory.story_title}
//               story_text={currentStory.story_text}
//               onClose={closeEditingMode}
//             />
//           ) : (
//             <>
//               <p className={styles["story-text"]}>
//                 {decodeURIComponent(currentStory.story_text)}
//               </p>
//               <button
//                 className={`${styles["story-edit-btn"]} `}
//                 onClick={() => setEditingMode(true)}
//               >
//                 <EditIcon color={"#3b444b"} size={20} />
//                 Edit
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
