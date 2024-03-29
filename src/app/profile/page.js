"use client";
import { auth } from "@/firebase/Firebase";
import { useEffect, useState } from "react";
import { fetchUser } from "@/redux/user/user-operations";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Loader } from "@/components/Loader";
import { Portal } from "@mui/material";
import { LogoutModal } from "@/components/LogoutModal";
import {
  getUserInfo,
  getIsUserError,
  getUserError,
  getIsUserLoading,
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
import { SidebarContainer } from "@/components/SidebarContainer";

function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.stsTokenManager.expirationTime > Date.now()) {
      dispatch(fetchUser(user.accessToken));
    }
  }, [dispatch, user]);

  const userInfo = useSelector(getUserInfo);
  const isUserError = useSelector(getIsUserError);
  const errorMessage = useSelector(getUserError);
  const isUserLoading = useSelector(getIsUserLoading);

  const formatPhone = (user) => {
    if (user && user.phone) {
      if (user.phone.includes("+")) {
        return user.phone;
      }
      return "+" + user.phone;
    }
  };
  const name =
    userInfo && !userInfo.detail
      ? userInfo.first_name + " " + userInfo.last_name
      : "N/A";
  const email = userInfo && !userInfo.detail ? userInfo.email : "N/A";
  const phone = userInfo && !userInfo.detail ? formatPhone(userInfo) : "N/A";
  return (
    <SidebarContainer>
      <PrivateRoute>
        <div className={styles["profile"]}>
          <div className={styles.container}>
            {isUserLoading ? (
              <Loader />
            ) : (
              <div className={styles["profile-content"]}>
                <h1 className={styles["page-title"]}>Your profile</h1>

                <div className={styles["profile-content-box"]}>
                  <p className={styles["profile-content-title"]}>
                    Personal information
                  </p>

                  <ul style={{ display: "contents" }}>
                    <li className={styles["profile-content-item"]}>
                      <div className={styles["profile-content-image-wrap"]}>
                        <UserIcon color={"#3b444b"} size={20} />
                        Name
                      </div>
                      <p>{name}</p>
                    </li>
                    <li className={styles["profile-content-item"]}>
                      <div className={styles["profile-content-image-wrap"]}>
                        <EmailIcon color={"#3b444b"} size={20} />
                        Email
                      </div>
                      <p>{email}</p>
                    </li>
                    <li className={styles["profile-content-item"]}>
                      <div className={styles["profile-content-image-wrap"]}>
                        <PhoneIcon color={"#3b444b"} size={20} />
                        Phone
                      </div>
                      <p>{phone}</p>
                    </li>
                  </ul>
                </div>

                <div className={styles["profile-content-box"]}>
                  <p className={styles["profile-content-title"]}>Other</p>
                  <ul style={{ display: "contents" }}>
                    <li style={{ listStyle: "none", width: "100%" }}>
                      <Link
                        href="https://www.blossomreads.com/order"
                        target="_blanc"
                        className={styles["profile-content-item"]}
                        // style={{ justifyContent: "center" }}
                      >
                        <p>Make new order</p>
                        <LinkArrowIcon color={"#3b444b"} size={20} />
                      </Link>
                    </li>
                    <li style={{ listStyle: "none", width: "100%" }}>
                      <Link
                        href="mailto:support@blossomreads.com"
                        target="_blanc"
                        className={styles["profile-content-item"]}
                        // style={{ justifyContent: "center" }}
                      >
                        <p>Ask for help</p>
                        <LinkArrowIcon color={"#3b444b"} size={20} />
                      </Link>
                    </li>
                    <li style={{ listStyle: "none", width: "100%" }}>
                      <button
                        className={styles["profile-content-item"]}
                        onClick={() => setModalOpen(true)}
                        // style={{ justifyContent: "center" }}
                      >
                        <p>Logout</p>
                        <LinkArrowIcon color={"#3b444b"} size={20} />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {modalOpen && (
              <Portal>
                <LogoutModal onClose={() => setModalOpen(false)} />
              </Portal>
            )}
          </div>
        </div>
      </PrivateRoute>
    </SidebarContainer>
  );
}

export default Profile;
