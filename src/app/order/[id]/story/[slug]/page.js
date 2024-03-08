"use client";

import { SidebarContainer } from "@/components/SidebarContainer";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "@/redux/orders/orders-selectors";
import { StoryModal } from "@/components/StoryModal";
import { useRouter } from "next/navigation";
import { BackIcon, LeftArrowIcon, RightArrowIcon } from "@/components/Icons";
import { Portal } from "@/components/Modal";
import { StoryEditingModal } from "@/components/StoryEditingModal";
import PrivateRoute from "@/components/PrivateRoute";
import ImageSlider from "@/components/ImageSlider";
// import styles from "../../../../scss/story-details.module.scss";
import styles from "../../../../../scss/story-details.module.scss";
import { useState } from "react";
import { NotFound } from "@/components/NotFound";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const variants = {
  hidden: { opacity: 0, scale: 0.75 },
  enter: { opacity: 1, scale: 1 },
};

function StoryPage({ params }) {
  const router = useRouter();
  const orders = useSelector(getOrders);
  const [modalOpen, setModalOpen] = useState(false);
  const currOrder = orders.find((el) => el.order_id === Number(params.id));
  const storyNumber = Number(params.slug);
  const currStory = currOrder.stories.find(
    (el) => el.story_number === storyNumber
  );
  if (!currStory) {
    return <NotFound order_id={params.id} />;
  }
  const goBack = () => {
    router.push(`/order/${params.id}`);
  };
  const goToPrev = () => {
    router.push(`/order/${params.id}/story/${storyNumber - 1}`);
  };
  const goToNext = () => {
    router.push(`/order/${params.id}/story/${storyNumber + 1}`);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (storyNumber < 6) {
        goToNext();
      }
    },
    onSwipedRight: () => {
      if (storyNumber > 1) {
        goToPrev();
      }
    },
  });
  return (
    <SidebarContainer>
      <PrivateRoute>
        {/* <Swipeable
          onSwipedLeft={handleSwipeLeft}
          onSwipedRight={handleSwipeRight}
        > */}
        <motion.main
          variants={variants}
          initial="hidden"
          animate="enter"
          transition={{ type: "linear", duration: 0.5 }}
        >
          <div className={styles["container"]} {...swipeHandlers}>
            <div className={styles["story-top-nav"]}>
              <button onClick={goBack} className={styles["story-nav-btn"]}>
                <BackIcon color={"#3b444b"} size={30} />
              </button>
              <div className={styles["story-nav-btn-wrap"]}>
                <button
                  onClick={goToPrev}
                  className={styles["story-nav-btn"]}
                  disabled={parseInt(storyNumber) === 1}
                >
                  <LeftArrowIcon color={"#3b444b"} size={30} />
                </button>
                <button
                  onClick={goToNext}
                  className={styles["story-nav-btn"]}
                  disabled={parseInt(storyNumber) === 6}
                >
                  <RightArrowIcon color={"#3b444b"} size={30} />
                </button>
              </div>
            </div>
            <div className={styles["story-wrapper"]}>
              <StoryModal
                stories={currOrder.stories}
                order_id={params.id}
                story_number={storyNumber}
                onOpen={() => setModalOpen(true)}
              />
              <ImageSlider order={currOrder} story_id={storyNumber} />
            </div>
          </div>

          {modalOpen && (
            <Portal>
              <StoryEditingModal
                order_id={Number(params.id)}
                story_id={storyNumber}
                story_title={currStory.story_title}
                story_text={currStory.story_text}
                onClose={() => setModalOpen(false)}
              />
            </Portal>
          )}
        </motion.main>
        {/* </Swipeable> */}
      </PrivateRoute>
    </SidebarContainer>
  );
}
export default StoryPage;
