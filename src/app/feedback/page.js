"use client";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
// import isAuth from "@/auth/withAuth";
import styles from "../../scss/feedback.module.scss";
import PrivateRoute from "@/components/PrivateRoute";

function SendFeedback() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements.rating.value);
    e.target.reset();
    setRating(null);
  };
  return (
    <PrivateRoute>
      <div className={styles["feedback-page"]}>
        <div className={styles.container}>
          <h1 className={styles["feedback-page-title"]}>
            Leave us your feedback
          </h1>
          <form className={styles["feedback-form"]} onSubmit={onSubmit}>
            <legend className={styles["feedback-form-legend"]}>
              Feedback form
            </legend>
            <label className={styles["feedback-form-label"]}>
              Subject{" "}
              <input
                type="text"
                id="text"
                name="text"
                className={styles["feedback-form-input"]}
              />
            </label>

            <label className={styles["feedback-form-label"]}>
              Your comment{" "}
              <textarea
                id="textarea"
                name="textarea"
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
                Rate your overall experience
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
              Send
            </button>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}

export default SendFeedback;
