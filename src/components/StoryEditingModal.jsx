import React from "react";
import { auth } from "@/firebase/Firebase";
import { editStory, fetchStories } from "@/redux/stories/stories-operations";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { UndoIcon, RedoIcon, SavedIcon, DoneIcon } from "@/components/Icons";
import styles from "../scss/story-details.module.scss";
import useUndoableState from "@/hooks/UseUndoableState";
import debounce from "lodash/debounce";

export const StoryEditingModal = ({
  order_id,
  story_id,
  story_title,
  story_text,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  // const [saved, setSaved] = useState(false);

  // const debouncedSave = useCallback(
  //   debounce((value) => {
  //     if (user && user.stsTokenManager.expirationTime > Date.now()) {
  //       dispatch(
  //         editStory({
  //           order_id: Number(order_id),
  //           story_id: Number(story_id),
  //           story_title: story_title,
  //           story_text: encodeURIComponent(value),
  //           token: user.accessToken,
  //         })
  //       );
  //     }
  //     setSaved(true);
  //   }, 1000),
  //   []
  // );
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
    // setSaved(false);
    setDoc(e.target.value);
    // debouncedSave(e.target.value);
  };

  const handleClick = (action) => {
    // setSaved(false);
    action();
  };

  // const onDoneClick = async (e) => {
  //   e.preventDefault;
  //   const storyTextValue = e.target.elements.textarea.value;
  //   if (user && user.stsTokenManager.expirationTime > Date.now()) {
  //     try {
  //       await dispatch(
  //         editStory({
  //           order_id: Number(order_id),
  //           story_id: Number(story_id),
  //           story_title: story_title,
  //           story_text: encodeURIComponent(storyTextValue),
  //           token: user.accessToken,
  //         })
  //       );
  //       dispatch(fetchStories({ id: order_id, token: user.accessToken }));
  //       onClose();
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  // };
  const onDoneClick = async (e) => {
    e.preventDefault();
    const storyTextValue = e.target.elements.textarea.value;
    if (user && user.stsTokenManager.expirationTime > Date.now()) {
      try {
        await dispatch(
          editStory({
            order_id: Number(order_id),
            story_id: Number(story_id),
            story_title: story_title,
            story_text: encodeURIComponent(storyTextValue),
            token: user.accessToken,
          })
        );

        // Call fetchStories only after editStory is successful
        dispatch(fetchStories({ id: order_id, token: user.accessToken }));

        onClose();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    // <div style={{ width: "100%" }}>
    <form style={{ width: "100%" }} onSubmit={onDoneClick}>
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
        {/* {saved && <SavedIcon color={"yellowgreen"} size={25} />} */}
        <div className={styles["story-btn-wrapper"]}>
          <button className={styles["story-btn"]} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={styles["story-btn"]}
            // onClick={onClose}
          >
            <DoneIcon color={"#f0623d"} size={20} />
            Done
          </button>
        </div>
      </div>
    </form>
    // </div>
  );
};
