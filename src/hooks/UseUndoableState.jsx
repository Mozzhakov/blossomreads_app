import { useState, useMemo } from "react";
import { isEqual, debounce, values } from "lodash"; // Assuming you have lodash library

function useUndoableState(init, debouncePeriod) {
  const [index, setIndex] = useState(0);
  const [state, setRawState] = useState(init);
  const [states, setStates] = useState([init]);

  const debouncedSetStates = useMemo(
    () =>
      debounce((value) => {
        const copy = [...states];
        copy.length = index + 1; // delete all history after index
        copy.push(value);
        setStates(copy);
        setIndex(copy.length - 1);
      }, debouncePeriod ?? 500),
    [states, index, debouncePeriod]
  );

  const setState = (value) => {
    if (isEqual(state, value)) {
      return;
    }
    setRawState(value);
    debouncedSetStates(value);
  };

  const resetState = (init) => {
    setIndex(0);
    setRawState(init);
    setStates([init]);
    // callback(init);
  };

  const goBack = (steps = 1) => {
    const newIndex = Math.max(0, Number(index) - (Number(steps) || 1));
    setIndex(newIndex);
    setRawState(states[newIndex]);
    // callback(states[newIndex]);
  };

  const goForward = (steps = 1) => {
    const newIndex = Math.min(
      states.length - 1,
      Number(index) + (Number(steps) || 1)
    );
    setIndex(newIndex);
    setRawState(states[newIndex]);
    // callback(states[newIndex]);
  };

  return {
    state,
    setState,
    resetState,
    index,
    lastIndex: states.length - 1,
    goBack,
    goForward,
  };
}

export default useUndoableState;
