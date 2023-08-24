
import React, { useEffect, useState } from "react";
import RcawaterfallChart from "../../Charts/BF_Charts/RcawaterfallChart";



function Rca({ isExpanded2, handleToggle2 }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const flexDirection = windowWidth < 1200 ? "flex-col" : "flex-row";

  return (
    <div className="flex flex-col w-[85vw] h-full bg-white p-4 rounded-xl border-2 shadow-md ">
      {/* top */}
      <div class="flex justify-between w-full">
        <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
          <div className="flex items-center gap-[8px]">
            {" "}
            <div class=" font-roboto text-[22px] text-[#3E3C42] font-medium">
              <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
                RCA
              </p>
            </div>
            <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
          </div>
          <div
            className={`flex items-start gap-[2%] w-[80%] ${
              windowWidth < 577 ? "flex-col" : ""
            }  `}
          >
            <div className="flex gap-[2px] items-center justify-center">
              <div className="flex gap-[2px] ">
                <img src="/darkbluedot.svg" alt="" />
              </div>
              <div class="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
                {" "}
                Parameters
              </div>
            </div>
            <div className="flex gap-[2px] ">
              <div>
                <img src="/brightyellowdot.svg" alt="" />
              </div>
              <div class="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
                Initial/Final values
              </div>
            </div>
          </div>
        </div>
        <div onClick={handleToggle2}>
          <img src="/dropicon.svg" alt="" />
        </div>
      </div>
      {/* bottom */}
      {isExpanded2 && (
        <div className={`flex gap-[18px] ${flexDirection} h-auto w-full`}>
            <RcawaterfallChart/>
            
         </div>
      )}
    </div>
  );
}

export default Rca;
