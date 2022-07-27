import React from "react";

///////////////////////////////////
// Implementation using useRef
///////////////////////////////////
const useDebounce = (delay = 800, noDelayInFirstTime = true) => {
  const timerId = React.useRef<NodeJS.Timeout>();
  const isFirstTime = React.useRef(noDelayInFirstTime);

  return React.useCallback(
    (func: () => void) => {
      if (isFirstTime.current) {
        isFirstTime.current = false;
        func();
      } else {
        clearTimeout(timerId.current);
        timerId.current = setTimeout(func, delay);
      }
    },
    [delay]
  );
};

///////////////////////////////////
// Implementation using useState
///////////////////////////////////
// const useDebounce = (delay = 800, noDelayInFirstTime = true) => {
//   const [, setTimerId] = React.useState<NodeJS.Timeout>();
//   const [isFirstTime, setIsFirstTime] = React.useState(noDelayInFirstTime);

//   return React.useCallback(
//     (func: () => void): void => {
//       if (isFirstTime) {
//         setIsFirstTime(false);
//         func();
//       } else {
//         const newTimerId = setTimeout(func, delay);
//         setTimerId(oldTimerId => {
//           clearTimeout(oldTimerId);
//           return newTimerId;
//         });
//       }
//     },
//     [delay, isFirstTime]
//   );
// };

export { useDebounce };
