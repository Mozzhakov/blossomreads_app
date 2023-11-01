import LoginForm from "./LoginForm";
import Link from "next/link";
import Image from "next/image";
import info from "../images/info-circle.svg";
import review from "../images/review.svg";
import styles from "../scss/hero.module.scss";

export default function Hero() {
  return (
    <section className={styles["hero-section"]}>
      <h1 className={styles["hero-title"]}>Welcome to Stastiem App</h1>
      <p className={styles["hero-text"]}>
        Before we print the book please review the stories in the book and edit
        them if you want.
      </p>
      <div className={styles["hero-btn-wrapper"]}>
        <Link href="/" className={styles["hero-btn-primary"]}>
          <Image
            src={review}
            alt="Review icon"
            className={styles["hero-btn-image"]}
          />
          Review
        </Link>
        <Link href="/" className={styles["hero-btn-secondary"]}>
          <Image
            src={info}
            alt="Info icon"
            className={styles["hero-btn-image"]}
          />
          More info
        </Link>
      </div>
    </section>
  );
}
