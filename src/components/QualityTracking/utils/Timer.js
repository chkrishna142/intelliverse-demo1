import React from "react";
import useTimer from "./useTimer";
import { useEffect, useState } from "react";
function Timer({ initialSeconds, callFunc, initialRender, setInitialRender }) {
  const seconds = useTimer(initialSeconds);
  useEffect(() => {
    if (!initialRender) {
      if (seconds === initialSeconds) {
        console.log("started the call");
        callFunc((prev) => !prev);
      }
    } else setInitialRender(false);
  }, [seconds, initialSeconds]);
  return (
    <div className="bg-white rounded-lg flex gap-2 p-1 pl-3 pr-3 items-center min-w-[220px]">
      <p className="text-[#3E3C42] text-sm">Data will update in</p>
      <img src="/SizingIcons/Clock.svg" />
      <p className="text-black font-medium text-sm">{seconds} s</p>
    </div>
  );
}
export default React.memo(Timer);
