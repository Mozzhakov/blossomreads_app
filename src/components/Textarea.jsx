import { useState, useEffect } from "react";

const Textarea = ({ val, fn, styles }) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if (isIOS) {
        const newWindowHeight = window.visualViewport.height;
        const newKeyboardHeight = window.innerHeight - newWindowHeight;

        // Update the state with the new keyboard height
        setKeyboardHeight(newKeyboardHeight);
      }
    };

    // Initial setup
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const elementHeight = `calc(100% - ${150.5 + keyboardHeight}px)`;

  return (
    <textarea
      name="textarea"
      onChange={fn}
      onFocus={() => window.dispatchEvent(new Event("resize"))}
      onBlur={() => window.dispatchEvent(new Event("resize"))}
      value={val}
      className={styles["story-textarea"]}
      style={{ height: elementHeight }}
    ></textarea>
  );
};

export default Textarea;
