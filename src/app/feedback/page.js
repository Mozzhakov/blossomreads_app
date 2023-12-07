"use client";
import { auth } from "@/firebase/Firebase";
import { FaStar } from "react-icons/fa";
import { Loader } from "@/components/Loader";
import { useNotify } from "@/hooks/useNotify";
import { fetchUser } from "@/redux/user/user-operations";
import { getUserInfo } from "@/redux/user/user-selectors";
import { sendFeedback } from "@/redux/feedback/feedback-operations";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SidebarContainer } from "@/components/SidebarContainer";
import { resetFeedbackStatus } from "@/redux/feedback/feedback-slice";
import {
  getIsFeedbackLoading,
  getIsFeedbackSent,
  getFeedbackSuccess,
  getIsFeedbackError,
  getFeedbackError,
} from "@/redux/feedback/feedback-selectors";
import styles from "../../scss/feedback.module.scss";
import PrivateRoute from "@/components/PrivateRoute";

function SendFeedback() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const { showSuccess, showFailure } = useNotify();

  useEffect(() => {
    if (user && user.stsTokenManager.expirationTime > Date.now()) {
      dispatch(fetchUser(user.accessToken));
    }
  }, [dispatch, user]);

  const userInfo = useSelector(getUserInfo);

  const onSubmit = (e) => {
    e.preventDefault();
    const name = userInfo.first_name + " " + userInfo.last_name;
    const email = userInfo.email;
    const subject = e.target.elements.subject.value;
    const comment = e.target.elements.comment.value;
    const feedbackData = { name, email, subject, comment, rating };
    dispatch(sendFeedback(feedbackData));
    e.target.reset();
    setRating(null);
  };
  const isFeedbackLoading = useSelector(getIsFeedbackLoading);
  const isFeedbackSent = useSelector(getIsFeedbackSent);
  const isFeedbackError = useSelector(getIsFeedbackError);
  const feedbackSuccess = useSelector(getFeedbackSuccess);
  const feedbackError = useSelector(getFeedbackError);

  useEffect(() => {
    if (isFeedbackSent) {
      showSuccess(feedbackSuccess);

      dispatch(resetFeedbackStatus());
    }
    if (isFeedbackError) {
      showFailure(feedbackError);
    }
  }, [
    feedbackError,
    feedbackSuccess,
    isFeedbackError,
    isFeedbackSent,
    showFailure,
    showSuccess,
    dispatch,
  ]);
  return (
    <SidebarContainer>
      <PrivateRoute>
        <div className={styles["feedback-page"]}>
          <div className={styles.container}>
            <h1 className={styles["feedback-page-title"]}>
              Leave your feedback
            </h1>
            <form className={styles["feedback-form"]} onSubmit={onSubmit}>
              <legend className={styles["feedback-form-legend"]}>
                Feedback form
              </legend>
              <label className={styles["feedback-form-label"]}>
                Title{" "}
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter the subject here"
                  className={styles["feedback-form-input"]}
                />
              </label>

              <label className={styles["feedback-form-label"]}>
                Your comment{" "}
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="Your comment here..."
                  className={styles["feedback-form-input--area"]}
                ></textarea>
              </label>

              <div
                style={{
                  display: "flex",
                  textAlign: "left",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p
                  className={styles["feedback-form-label"]}
                  style={{ marginBottom: "5px" }}
                >
                  Rate your experience
                </p>
                <div>
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={currentRating}
                          onClick={() => setRating(currentRating)}
                          className={styles["feedback-form-input--radio"]}
                          required
                        />
                        <FaStar
                          size={30}
                          color={
                            currentRating <= (hover || rating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          style={{ cursor: "pointer" }}
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <button type="submit" className={styles["btn_primary"]}>
                Send feedback
              </button>
            </form>
          </div>
          {isFeedbackLoading && <Loader />}
        </div>
      </PrivateRoute>
    </SidebarContainer>
  );
}

export default SendFeedback;
