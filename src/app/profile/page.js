"use client";
import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { EmailIcon, PhoneIcon, LinkArrowIcon } from "@/components/Icons";
import styles from "../../scss/profile.module.scss";

export default function Profile() {
  const [user] = useAuthState(auth);
  return (
    <div className={styles["profile"]}>
      <h1 className={styles["profile-title"]}>Profile page</h1>
      <div className={styles["profile-content-box"]}>
        <p>Personal information:</p>
        <div className={styles["profile-content-item"]}>
          <div className={styles["profile-content-image-wrap"]}>
            <EmailIcon color={"#000"} size={25} />
            Email:
          </div>
          {user && <p>{user.email}</p>}
        </div>
        <div className={styles["profile-content-item"]}>
          <div className={styles["profile-content-image-wrap"]}>
            <PhoneIcon color={"#000"} size={25} />
            Phone:
          </div>
        </div>
      </div>
      <div className={styles["profile-content-box"]}>
        <p>Other:</p>
        <div className={styles["profile-content-item"]}>
          <p>Make new order</p>
          <LinkArrowIcon color={"#f0623d"} size={25} />
        </div>
        <div className={styles["profile-content-item"]}>
          <p>Ask for help</p>
          <LinkArrowIcon color={"#f0623d"} size={25} />
        </div>
        <div className={styles["profile-content-item"]}>
          <p>Logout</p>
          <LinkArrowIcon color={"#f0623d"} size={25} />
        </div>
      </div>
    </div>
  );
}
