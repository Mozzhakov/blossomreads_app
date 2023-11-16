import debounce from "lodash/debounce";
import { useState } from "react";

export const AutoSave = () => {
  const [text, setText] = useState(""); // The input field value

  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    autoSave(newText);
  };

  const autoSave = debounce((newText) => {
    // Implement your autosave logic here (e.g., send data to a server or save to local storage)
    console.log("Autosaving:", newText);
  }, 2000); // Adjust the debounce delay as needed

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type and it will autosave"
      />
    </div>
  );
};
