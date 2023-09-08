import React from "react";
import useTimer from "./useTimer";
function Timer({ initialSeconds }) {
  const seconds = useTimer(initialSeconds);
  return (
    <div className="bg-white rounded-lg flex gap-2 p-1 pl-3 pr-3 items-center min-w-[220px]">
      <p className="text-[#3E3C42] text-sm">Data will update in</p>
      <img src="/SizingIcons/Clock.svg"/>
      <p className="text-black font-medium text-sm">{seconds} s</p>

    </div>
  );
}
export default React.memo(Timer);
