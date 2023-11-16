"use client";
import { UndoIcon, RedoIcon } from "@/components/Icons";
import { useSelector } from "react-redux";
import { getStories } from "@/redux/selectors";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { editStory } from "@/redux/stories/stories-operations";
import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { SavedIcon } from "@/components/Icons";
import useUndoableState from "@/hooks/UseUndoableState";
import debounce from "lodash/debounce";
import styles from "../../../../../scss/story-details.module.scss";

export default function StoryDetails({ params }) {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const stories = useSelector(getStories);
  // const storiesFromStorage = JSON.parse(
  //   JSON.parse(localStorage.getItem("persist:stories")).items
  // );
  const currentStory = stories.find(
    (el) => el.story_number === Number(params.slug)
  );

  const debouncedSave = useCallback(
    debounce((value) => {
      if (user && user.stsTokenManager.expirationTime > Date.now()) {
        dispatch(
          editStory({
            order_id: Number(params.id),
            story_id: Number(params.slug),
            story_title: currentStory.story_title,
            story_text: value,
            token: user.accessToken,
          })
        );
      }
      console.log("Sending to backend:", value);
      setSaving(false);
      setSaved(true);
    }, 1000),
    []
  );

  const {
    state: doc,
    states: docs,
    setState: setDoc,
    resetState: resetDoc,
    index: docStateIndex,
    lastIndex: docStateLastIndex,
    goBack: undoDoc,
    goForward: redoDoc,
  } = useUndoableState(currentStory.story_text, 200, debouncedSave);

  const canUndo = docStateIndex > 0;
  const canRedo = docStateIndex < docStateLastIndex;

  const handleChange = (e) => {
    setSaved(false);
    setSaving(true);
    setDoc(e.target.value);
    debouncedSave(e.target.value);
  };

  const handleClick = (action, value = "") => {
    setSaved(false);
    setSaving(true);
    action();
    if (action === resetDoc) {
      action(value);
    }
  };
  // console.log(
  //   storiesFromStorage.find(
  //     (el) => el.story_number === currentStory.story_number
  //   )
  // );
  return (
    // <div className={styles["story"]}>
    //   <div className={styles["story-btn-wrapper"]}>
    //     <button
    //       onClick={() => handleClick(undoDoc)}
    //       disabled={!canUndo}
    //       className={styles["story-btn"]}
    //     >
    //       <UndoIcon
    //         color={canUndo ? "#f0623d" : "rgba(16, 16, 16, 0.3)"}
    //         size={20}
    //       />
    //       Undo
    //     </button>
    //     <button
    //       onClick={() => handleClick(redoDoc)}
    //       disabled={!canRedo}
    //       className={styles["story-btn"]}
    //     >
    //       <RedoIcon
    //         color={canRedo ? "#f0623d" : "rgba(16, 16, 16, 0.3)"}
    //         size={20}
    //       />
    //       Redo
    //     </button>
    //     <button
    //       onClick={() => handleClick(resetDoc, currentStory.story_text)}
    //       disabled={!canUndo}
    //       className={styles["story-btn"]}
    //     >
    //       Reset
    //     </button>
    //     {/* {saving && <p>Saving...</p>} */}
    //     {saved && <SavedIcon color={"yellowgreen"} size={25} />}
    //   </div>

    //   <h3 className={styles["story-title"]}>
    //     {currentStory.story_number}. {currentStory.story_title}
    //   </h3>

    //   <textarea
    //     name="story_text"
    //     id="story_text"
    //     onChange={handleChange}
    //     value={doc}
    //     autoFocus
    //     className={styles["story-text"]}
    //   ></textarea>
    // </div>
    <h1>qwe</h1>
  );
}
