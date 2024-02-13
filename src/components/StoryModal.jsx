// import React from "react";
// import { useState, useEffect } from "react";
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
//   const [editingMode, setEditionMode] = useState(false);
//   const [swipeDirection, setSwipeDirection] = useState(null);
//   console.log(story_number);
//   const currentStory = stories.find(
//     (el) => el.story_number === Number(story_number)
//   );
//   function TextComponent(text) {
//     const lines = text.split("\n");
//     return (
//       <>
//         {lines.map((line, index) => (
//           <React.Fragment key={index}>
//             {line}
//             <br />
//           </React.Fragment>
//         ))}
//       </>
//     );
//   }

//   let storyText = TextComponent(currentStory.story_text);

//   const closeEditingMode = () => {
//     setEditionMode(false);
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
//     }, 200); // Adjust the duration to match the animation duration
//     return () => clearTimeout(timeoutId);
//   }, [swipeDirection]);
//   const isMobile = window.innerWidth <= 768;
//   return (
//     <>
//       <div className={styles["story-overlay"]} onClick={onClose}></div>
//       <div className={styles["story-modal"]}>
//         <div className={styles["story-top-nav"]}>
//           <button
//             className={
//               editingMode
//                 ? styles["story-back-btn--disabled"]
//                 : styles["story-back-btn"]
//             }
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
//               onClick={prev}
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
//               onClick={next}
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
//               <p className={styles["story-text"]}>{storyText}</p>
//               <button
//                 className={styles["story-edit-btn"]}
//                 onClick={() => setEditionMode(true)}
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

// import React, { useState, useEffect } from "react";
// import { StoryEditingModal } from "./StoryEditingModal";
// import Swiper from "swiper";
// import "swiper/css";
// import {
//   LeftArrowIcon,
//   RightArrowIcon,
//   BackIcon,
//   EditIcon,
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
//   const [editingMode, setEditionMode] = useState(false);
//   const [swiperInstance, setSwiperInstance] = useState(null);

//   useEffect(() => {
//     if (!editingMode) {
//       const swiper = new Swiper(".swiper", {
//         direction: "horizontal",
//         loop: false,
//         initialSlide: story_number - 1,
//         navigation: {
//           nextEl: ".swiper-button-next",
//           prevEl: ".swiper-button-prev",
//         },
//       });
//       setSwiperInstance(swiper);
//     }

//     return () => {
//       if (swiperInstance) {
//         swiperInstance.destroy();
//       }
//     };
//   }, [editingMode, story_number]);

//   const currentStory = stories.find(
//     (el) => el.story_number === Number(story_number)
//   );

//   const closeEditingMode = () => {
//     setEditionMode(false);
//   };

//   return (
//     <>
//       <div className={styles["story-overlay"]} onClick={onClose}></div>
//       <div className={styles["story-modal"]}>
//         <div className={styles["story-top-nav"]}>
//           <button
//             className={
//               editingMode
//                 ? styles["story-back-btn--disabled"]
//                 : styles["story-back-btn"]
//             }
//             onClick={onClose}
//           >
//             <BackIcon
//               color={editingMode ? "rgba(16, 16, 16, 0.3)" : "#3b444b"}
//               size={25}
//             />
//             back
//           </button>
//           <div className={styles["story-nav-btn-wrap"]}>
//             <button className={`${styles["story-nav-btn"]} swiper-button-prev`}>
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
//             <button className={`${styles["story-nav-btn"]} swiper-button-next`}>
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
//         <div className="swiper">
//           <div className="swiper-wrapper">
//             {stories.map((el) => (
//               <div className="swiper-slide" key={el.story_number}>
//                 <div className={styles["story-content"]}>
//                   <h3 className={styles["story-title"]}>
//                     {el.story_number}. {el.story_title}
//                   </h3>
//                   {editingMode ? (
//                     <StoryEditingModal
//                       order_id={order_id}
//                       story_id={currentStory.story_number}
//                       story_title={currentStory.story_title}
//                       story_text={currentStory.story_text}
//                       onClose={closeEditingMode}
//                     />
//                   ) : (
//                     <>
//                       <p className={styles["story-text"]}>{el.story_text}</p>
//                       <button
//                         className={styles["story-edit-btn"]}
//                         onClick={() => setEditionMode(true)}
//                       >
//                         <EditIcon color={"#3b444b"} size={20} />
//                         Edit
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useState, useEffect } from "react";
import { StoryEditingModal } from "./StoryEditingModal";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import {
  LeftArrowIcon,
  RightArrowIcon,
  BackIcon,
  EditIcon,
} from "@/components/Icons";
import styles from "../scss/story-details.module.scss";

SwiperCore.use([Navigation]);

export const StoryModal = ({
  stories,
  order_id,
  story_number,
  onClose,
  prev,
  next,
}) => {
  const [editingMode, setEditionMode] = useState(false);

  const currentStory = stories.find(
    (el) => el.story_number === Number(story_number)
  );

  const closeEditingMode = () => {
    setEditionMode(false);
  };

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
              className={`${styles["story-nav-btn"]} ${
                currentStory.story_number > 1 && !editingMode
                  ? ""
                  : styles["swiper-button-disabled"]
              }`}
              onClick={prev}
            >
              <LeftArrowIcon color={"#3b444b"} size={22} />
              prev
            </button>
            <button
              className={`${styles["story-nav-btn"]} ${
                currentStory.story_number < 6 && !editingMode
                  ? ""
                  : styles["swiper-button-disabled"]
              }`}
              onClick={next}
            >
              <RightArrowIcon color={"#3b444b"} size={22} />
              next
            </button>
          </div>
        </div>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
        >
          {stories.map((el) => (
            <SwiperSlide key={el.story_number}>
              <div className={styles["story-content"]}>
                <h3 className={styles["story-title"]}>
                  {el.story_number}. {el.story_title}
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
                    <p className={styles["story-text"]}>{el.story_text}</p>
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
