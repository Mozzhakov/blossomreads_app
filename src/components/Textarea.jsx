// import { useEffect, useState } from "react";

// const Textarea = ({ val, fn, styles }) => {
//   const [vh, setVh] = useState(window.innerHeight * 0.01);

//   useEffect(() => {
//     const handleResize = () => {
//       setVh(window.innerHeight * 0.01);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   console.log(vh);
//   const calculatedHeight = `calc(${vh} * 100px - 150.5px)`; // Empty dependency array ensures the effect runs once after initial render
//   console.log(calculatedHeight);
//   return (
//     <textarea
//       name="textarea"
//       onChange={fn}
//       value={val}
//       autoFocus
//       className={styles["story-textarea"]}
//       style={{ height: `var(--calculated-height, ${calculatedHeight})` }}
//     ></textarea>
//   );
// };

// export default Textarea;
