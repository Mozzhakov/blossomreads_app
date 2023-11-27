"use client";
import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { EmailIcon, PhoneIcon, LinkArrowIcon } from "@/components/Icons";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/auth/auth-operations";
import Link from "next/link";
import styles from "../../scss/profile.module.scss";
import PrivateRoute from "@/components/PrivateRoute";

function Profile() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logOut({ auth }));
  };

  return (
    <PrivateRoute>
      <div className={styles["profile"]}>
        <div className={styles.container}>
          <div className={styles["profile-content"]}>
            <h1 className={styles["profile-title"]}>User&#39;s name</h1>
            <div className={styles["profile-content-box"]}>
              <p className={styles["profile-content-title"]}>
                Personal information:
              </p>
              <ul style={{ display: "contents" }}>
                <li className={styles["profile-content-item"]}>
                  {/* <div className={styles["profile-content-item"]}> */}
                  <div className={styles["profile-content-image-wrap"]}>
                    <EmailIcon color={"#3b444b"} size={25} />
                    Email:
                  </div>
                  {user && <p>{user.email}</p>}
                  {/* </div> */}
                </li>
                <li className={styles["profile-content-item"]}>
                  {/* <div className={styles["profile-content-item"]}> */}
                  <div className={styles["profile-content-image-wrap"]}>
                    <PhoneIcon color={"#3b444b"} size={25} />
                    Phone:
                  </div>
                  {/* </div> */}
                </li>
              </ul>
            </div>
            <div className={styles["profile-content-box"]}>
              <p className={styles["profile-content-title"]}>Other:</p>
              <ul style={{ display: "contents" }}>
                <li style={{ listStyle: "none", width: "100%" }}>
                  <Link
                    href="https://www.stastiem.com/order"
                    target="_blanc"
                    className={styles["profile-content-item"]}
                  >
                    <p>Make new order</p>
                    <LinkArrowIcon color={"#f0623d"} size={25} />
                  </Link>
                </li>
                <li style={{ listStyle: "none", width: "100%" }}>
                  <Link
                    href="/help"
                    target="_blanc"
                    className={styles["profile-content-item"]}
                  >
                    <p>Ask for help</p>
                    <LinkArrowIcon color={"#f0623d"} size={25} />
                  </Link>
                </li>
                <li style={{ listStyle: "none", width: "100%" }}>
                  <button
                    className={styles["profile-content-item"]}
                    onClick={onLogoutClick}
                  >
                    <p>Logout</p>
                    <LinkArrowIcon color={"#f0623d"} size={25} />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}

export default Profile;
