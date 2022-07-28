import React from "react";

///////////////////////////////////
// Implementation using useRef:
// This is the preferred implementation given that changes to the reference variable will
// not force the component to re-render neither will force useCallback to generate another
// function. On the other hand, if using useState, setState will force the component to re-render
// and changes to state variables must force useCallback to generate another function, otherwise
// the function will keep using the old state value.
///////////////////////////////////
const useDebounce = (delay = 500, noDelayInFirstTime = true) => {
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
