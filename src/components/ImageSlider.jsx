"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "@/redux/orders/orders-selectors";
import { ImageLoader } from "./Loader";
import { editStoryImage } from "@/redux/stories/stories-operations";
import { fetchOrdersAndStories } from "@/redux/orders/orders-operations";
import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/legacy/image";
import Slider from "react-slick";
import styles from "../scss/slider.module.scss";

function ImageSlider({ order, story_id }) {
  let images = [];
  let imagesArray = [];
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const orders = useSelector(getOrders);
  const currOrder = orders.find((el) => el.order_id === Number(order.order_id));
  const currStory = currOrder.stories.find(
    (el) => el.story_number === Number(story_id)
  );
  if (currStory.right_image_optimized) {
    images = [currStory.right_image_optimized];
  } else {
    images = [];
  }

  // console.log(currStory);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const imagesObj = currStory.right_image_selections_optimized;

  const allSmallImages = document.querySelectorAll(
    ".slider_slider-image-small__elk57"
  );
  for (const key in imagesObj) {
    if (Object.hasOwnProperty.call(imagesObj, key)) {
      const imageObj = imagesObj[key];
      images.push(imageObj.url);
      imagesArray.push(imageObj);
    }
  }

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <Image
            src={images[i]}
            alt={`img${i + 1}`}
            width={40}
            height={40}
            className={styles["slider-image-small"]}
            priority={false}
            onLoad={() => setIsLoading(false)}
          />
          {isLoading && <ImageLoader />}
        </a>
      );
    },
    dots: true,
    dotsClass: styles["slider-pag"],
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setActiveIndex(index),
  };
  // console.log(imagesArray);
  useEffect(() => {
    setActiveIndex((prevIndex) => {
      allSmallImages.forEach((el) => (el.style.border = "none"));
      const slickCurrentElement = document.querySelector("li.slick-active");
      const imageElement = slickCurrentElement.querySelectorAll("img");
      imageElement[1].style.border = "2px solid #f0623d";
      const currentIndex = Array.from(
        slickCurrentElement.parentNode.children
      ).indexOf(slickCurrentElement);

      return Number(currentIndex);
    });

    if (
      user &&
      user.stsTokenManager.expirationTime > Date.now() &&
      activeIndex !== 0
    ) {
      try {
        const activeImageKey = imagesArray[activeIndex].key;
        const correctActiveKey = activeImageKey.replace(".webp", ".png");
        dispatch(
          editStoryImage({
            order_id: Number(order.order_id),
            story_id: Number(story_id),
            story_image: correctActiveKey,
            token: user.accessToken,
          })
        ).then(() => {
          dispatch(fetchOrdersAndStories(user));
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    // else {
    //   console.log("Your token expired, please reload the page");
    // }
  }, [activeIndex]);

  return (
    <div className={styles["slider-container"]}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Image
              layout="responsive"
              src={image}
              alt={`img${index + 1}`}
              width={"50%"}
              height={"50%"}
              className={styles["slider-image"]}
              priority={false}
              onLoad={() => setIsLoading(false)}
            />
            {isLoading && <ImageLoader />}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;
