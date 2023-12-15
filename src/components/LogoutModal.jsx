import { auth } from "@/firebase/Firebase";
import { logOut } from "@/redux/auth/auth-operations";
import { useDispatch } from "react-redux";
import styles from "../scss/logout.module.scss";

export const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(logOut({ auth }));
    localStorage.removeItem("persist:orders");
    localStorage.removeItem("persist:stories");
  };
  return (
    <>
      <div onClick={onClose} className={styles["logout-overlay"]}></div>
      <div className={styles["logout-modal"]}>
        <p className={styles["logout-modal-title"]}>Already leaving?</p>
        <div className={styles["logout-modal-btn-wrap"]}>
          <button onClick={onClose} className={styles["logout-modal-btn"]}>
            Cancel
          </button>
          <button
            className={styles["logout-modal-btn"]}
            onClick={onLogoutClick}
          >
            Yes
          </button>
        </div>
      </div>
    </>
  );
};
