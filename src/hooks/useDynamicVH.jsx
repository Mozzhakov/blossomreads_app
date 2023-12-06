// import { useEffect, useRef } from "react";

// const useDynamicVH = () => {
//   const vh = useRef(window.innerHeight * 0.01);

//   useEffect(() => {
//     const handleResize = () => {
//       vh.current = window.innerHeight * 0.01;
//       document.documentElement.style.setProperty("--vh", `${vh.current}px`);
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return vh.current;
// };

// export default useDynamicVH;
