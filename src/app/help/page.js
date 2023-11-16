"use client";

import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

function AutoSaveInput() {
  const [inputValue, setInputValue] = useState("");
  const [savedValue, setSavedValue] = useState("");
  const [loading, setLoading] = useState(false);
  // Define a debounced save function
  const debouncedSave = useCallback(
    debounce((value) => {
      console.log("Sending to backend:", value);
      setSavedValue(value);
      setLoading(false);
    }, 1000),
    []
  );
  // Handle input changes
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setLoading(true);
    debouncedSave(newValue);
  };

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, []);

  return (
    <div>
      {loading ? <p>Saving...</p> : <p>Saved</p>}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <p>Saved Value: {savedValue}</p>
    </div>
  );
}

export default AutoSaveInput;
