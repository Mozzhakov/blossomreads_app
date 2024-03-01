"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrders } from "@/redux/orders/orders-selectors";
import Image from "next/image";
import Slider from "react-slick";
import styles from "../scss/slider.module.scss";

function ImageSlider({ order, story_id }) {
  const orders = useSelector(getOrders);
  const currOrder = orders.find((el) => el.order_id === Number(order.order_id));
  const currStory = currOrder.stories.find(
    (el) => el.story_number === Number(story_id)
  );
  const imagesObj = currStory.right_image_selections_optimized;
  const images = [];
  for (const key in imagesObj) {
    if (Object.hasOwnProperty.call(imagesObj, key)) {
      const url = imagesObj[key];
      images.push(url);
    }
  }
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const slickCurrentElement = document.querySelector(".slick-current");
    const currentIndex = Array.from(
      slickCurrentElement.parentNode.children
    ).indexOf(slickCurrentElement);
    setActiveIndex(currentIndex);
    console.log(currentIndex);
    console.log(slickCurrentElement);
  }, [activeIndex]);

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <Image
            src={images[i]}
            alt={`img${i + 1}`}
            width={50}
            height={50}
            className={styles["slider-image-small"]}
          />
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

  return (
    <div
      className={styles["slider-container"]}
      // style={{ width: "100%", height: "500px" }}
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Image
              layout="responsive"
              src={image}
              alt={`img${index + 1}`}
              width={400}
              height={400}
              style={{ maxHeight: "500px", maxWidth: "500px" }}
              className={styles["slider-image"]}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;
