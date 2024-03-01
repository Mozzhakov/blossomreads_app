"use client";
import { SidebarContainer } from "@/components/SidebarContainer";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "@/redux/orders/orders-selectors";
import { StoryModal } from "@/components/StoryModal";
import { useRouter } from "next/navigation";
import { BackIcon, LeftArrowIcon, RightArrowIcon } from "@/components/Icons";
import PrivateRoute from "@/components/PrivateRoute";
import ImageSlider from "@/components/ImageSlider";
import styles from "../../../../scss/story-details.module.scss";

function StoryPage({ params }) {
  const router = useRouter();
  const orders = useSelector(getOrders);
  console.log(orders);
  const currOrder = orders.find((el) => el.order_id === Number(params.id));
  const searchParams = useSearchParams();
  const storyNumber = Number(searchParams.get("number"));
  const goBack = () => {
    router.push(`/order/${params.id}`);
  };
  const goToPrev = () => {
    router.push(`/order/${params.id}/story?number=${storyNumber - 1}`);
  };
  const goToNext = () => {
    router.push(`/order/${params.id}/story?number=${storyNumber + 1}`);
  };

  return (
    <SidebarContainer>
      <PrivateRoute>
        <div className={styles["container"]}>
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
            />
            <ImageSlider order={currOrder} story_id={storyNumber} />
          </div>
        </div>
      </PrivateRoute>
    </SidebarContainer>
  );
}
export default StoryPage;
