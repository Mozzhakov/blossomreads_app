import React, { useEffect } from "react";
import { auth } from "@/firebase/Firebase";
import { editStory, fetchStories } from "@/redux/stories/stories-operations";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { UndoIcon, RedoIcon, DoneIcon } from "@/components/Icons";
import styles from "../scss/story-details.module.scss";
import useUndoableState from "@/hooks/UseUndoableState";
// import useDynamicVH from "@/hooks/useDynamicVH";
import Textarea from "./Textarea";

export const StoryEditingModal = ({
  order_id,
  story_id,
  story_title,
  story_text,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const {
    state: doc,
    setState: setDoc,
    index: docStateIndex,
    lastIndex: docStateLastIndex,
    goBack: undoDoc,
    goForward: redoDoc,
  } = useUndoableState(decodeURIComponent(story_text), 500);

  const canUndo = docStateIndex > 0;
  const canRedo = docStateIndex < docStateLastIndex;

  const handleChange = (e) => {
    setDoc(e.target.value);
  };

  const handleClick = (action) => {
    action();
  };

  const onDoneClick = async (e) => {
    e.preventDefault();
    const storyTextValue = e.target.elements.textarea.value;
    if (user && user.stsTokenManager.expirationTime > Date.now()) {
      try {
        if (storyTextValue !== story_text) {
          await dispatch(
            editStory({
              order_id: Number(order_id),
              story_id: Number(story_id),
              story_title: story_title,
              story_text: encodeURIComponent(storyTextValue),
              token: user.accessToken,
            })
          );

          dispatch(fetchStories({ id: order_id, token: user.accessToken }));

          onClose();
        }
        onClose();
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    const textarea = document.querySelector(`.${styles["story-textarea"]}`);
    const bottomPanel = document.querySelector(
      `.${styles["story-bottom-panel"]}`
    );
    const isiOS = /iPad|iPhone|iPod/.test(navigator.platform);
    if (window.visualViewport && isiOS) {
      const vv = window.visualViewport;

      function fixPosition() {
        textarea.style.height = `calc(${vv.height}px - 150.5px)`;
        textarea.style.bottom = "auto";
        textarea.style.top = "90.5px";
        bottomPanel.style.top = `${vv.height}px`;
        bottomPanel.style.bottom = "auto";
        bottomPanel.style.transform = "translateY(-100%)";
      }

      vv.addEventListener("resize", fixPosition);
      fixPosition(); // Make sure we call it once before resizing too

      return () => {
        vv.removeEventListener("resize", fixPosition);
      };
    }
  }, []);

  return (
    // <div style={{ width: "100%" }}>
    <form style={{ width: "100%" }} onSubmit={onDoneClick}>
      {/* <Textarea val={doc} fn={handleChange} styles={styles} /> */}
      <textarea
        name="textarea"
        onChange={handleChange}
        value={doc}
        autoFocus
        className={styles["story-textarea"]}
      ></textarea>
      <div className={styles["story-bottom-panel"]}>
        <div className={styles["story-btn-wrapper"]}>
          <button
            onClick={() => handleClick(undoDoc)}
            disabled={!canUndo}
            className={styles["story-btn"]}
          >
            <UndoIcon
              color={canUndo ? "#3b444b" : "rgba(16, 16, 16, 0.3)"}
              size={20}
            />
            Undo
          </button>
          <button
            onClick={() => handleClick(redoDoc)}
            disabled={!canRedo}
            className={styles["story-btn"]}
          >
            <RedoIcon
              color={canRedo ? "#3b444b" : "rgba(16, 16, 16, 0.3)"}
              size={20}
            />
            Redo
          </button>
        </div>
        <div className={styles["story-btn-wrapper"]}>
          <button className={styles["story-btn"]} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={styles["story-btn"]}>
            <DoneIcon color={"#f0623d"} size={20} />
            Done
          </button>
        </div>
      </div>
    </form>
    // </div>
  );
};
