"use client";
import { useSelector } from "react-redux";
import { getStories } from "@/redux/selectors";
import { useState } from "react";
import styles from "../../../../../scss/main.module.scss";

export default function StoryDetails({ params }) {
  const stories = useSelector(getStories);
  const currentStory = stories.find(
    (el) => el.story_number === Number(params.slug)
  );
  const [initText, setInitText] = useState(currentStory.story_text);
  const [editedText, setEditedText] = useState("");
  const [isEdition, setIsEdition] = useState(false);

  const onSaveClickBtn = (e) => {
    e.preventDefault();
    setEditedText(e.target.elements.story_text.value);
    setIsEdition(false);
  };
  return (
    currentStory && (
      <>
        <h3>{currentStory.story_title}</h3>
        {editedText ? (
          <p>{editedText}</p>
        ) : (
          // <p
          //   contentEditable="true"
          //   autoFocus
          //   suppressContentEditableWarning={true}

          //   style={{
          //     border: "2px solid #f0623d",
          //     padding: "10px",
          //     borderRadius: "5px",
          //   }}

          // >
          //   {initText}
          // </p>
          <textarea
            name="story_text"
            id="story_text"
            defaultValue={editedText || initText}
            autoFocus
            style={{
              border: "none",
              width: "100%",
              height: "500px",
              fontFamily: "inherit",
              outline: "none",
            }}
          ></textarea>
        )}
        {/* <button
            onClick={() => setIsEdition(true)}
            className={styles.btn_primary}
          >
            Edit
          </button> */}
        {/* {isEdition ? (
          <form onSubmit={onSaveClickBtn}>
            <input
              name="story_text"
              id="story_text"
              defaultValue={editedText || initText}
              autoFocus
              style={{
                border: "none",
                width: "100%",
                height: "500px",
                fontFamily: "inherit",
                lineBreak: "auto",
              }}
            />
            <button onClick={() => setIsEdition(false)}>Cancel</button>
            <button type="submit" className={styles.btn_primary}>
              Save
            </button>
          </form>
        ) : (
          <p>{currentStory.story_text}</p>
        )} */}
      </>
    )
  );
}
