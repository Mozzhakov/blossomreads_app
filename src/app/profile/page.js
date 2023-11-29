"use client";
import { auth } from "@/firebase/Firebase";
import { logOut } from "@/redux/auth/auth-operations";
import { useEffect } from "react";
import { fetchUser } from "@/redux/user/user-operations";
import { useNotify } from "@/hooks/useNotify";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import {
  getUserInfo,
  getIsUserError,
  getUserError,
} from "@/redux/user/user-selectors";
import {
  EmailIcon,
  PhoneIcon,
  LinkArrowIcon,
  UserIcon,
} from "@/components/Icons";
import Link from "next/link";
import styles from "../../scss/profile.module.scss";
import PrivateRoute from "@/components/PrivateRoute";

function Profile() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const { showFailure } = useNotify();

  const onLogoutClick = () => {
    dispatch(logOut({ auth }));
    localStorage.removeItem("persist:orders");
    localStorage.removeItem("persist:stories");
  };

  useEffect(() => {
    if (user && user.stsTokenManager.expirationTime > Date.now()) {
      dispatch(fetchUser(user.accessToken));
    }
  }, [dispatch, user]);
  // console.log(user.accessToken);

  const userInfo = useSelector(getUserInfo);
  const isUserError = useSelector(getIsUserError);
  const errorMessage = useSelector(getUserError);

  useEffect(() => {
    if (isUserError) {
      showFailure(errorMessage);
    }
  }, [errorMessage, isUserError, showFailure]);

  const formatPhone = (user) => {
    if (user && user.phone) {
      if (user.phone.includes("+")) {
        return user.phone;
      }
      return "+" + user.phone;
    }
  };
  // console.log(userInfo);
  const name =
    userInfo && !userInfo.detail
      ? userInfo.first_name + " " + userInfo.last_name
      : "N/A";
  const email = userInfo && !userInfo.detail ? userInfo.email : "N/A";
  const phone = userInfo && !userInfo.detail ? formatPhone(userInfo) : "N/A";
  return (
    <PrivateRoute>
      <div className={styles["profile"]}>
        <div className={styles.container}>
          <div className={styles["profile-content"]}>
            <h1 className={styles["profile-title"]}>Your profile</h1>

            <div className={styles["profile-content-box"]}>
              <p className={styles["profile-content-title"]}>
                Personal information:
              </p>

              <ul style={{ display: "contents" }}>
                <li className={styles["profile-content-item"]}>
                  <div className={styles["profile-content-image-wrap"]}>
                    <UserIcon color={"#3b444b"} size={20} />
                    Name:
                  </div>
                  <p>{name}</p>
                </li>
                <li className={styles["profile-content-item"]}>
                  <div className={styles["profile-content-image-wrap"]}>
                    <EmailIcon color={"#3b444b"} size={20} />
                    Email:
                  </div>
                  <p>{email}</p>
                </li>
                <li className={styles["profile-content-item"]}>
                  <div className={styles["profile-content-image-wrap"]}>
                    <PhoneIcon color={"#3b444b"} size={20} />
                    Phone:
                  </div>
                  <p>{phone}</p>
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
                    <LinkArrowIcon color={"#3b444b"} size={20} />
                  </Link>
                </li>
                <li style={{ listStyle: "none", width: "100%" }}>
                  <Link
                    href="/help"
                    target="_blanc"
                    className={styles["profile-content-item"]}
                  >
                    <p>Ask for help</p>
                    <LinkArrowIcon color={"#3b444b"} size={20} />
                  </Link>
                </li>
                <li style={{ listStyle: "none", width: "100%" }}>
                  <button
                    className={styles["profile-content-item"]}
                    onClick={onLogoutClick}
                  >
                    <p>Logout</p>
                    <LinkArrowIcon color={"#3b444b"} size={20} />
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
