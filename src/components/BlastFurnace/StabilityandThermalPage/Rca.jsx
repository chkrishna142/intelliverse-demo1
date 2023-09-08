
import React, { useEffect, useState } from "react";
import RcawaterfallChart from "../../Charts/BF_Charts/RcawaterfallChart";
import { useWindowSize } from "@uidotdev/usehooks";



function Rca({ isExpanded2, handleToggle2 ,series,options}) {
  
 const size=useWindowSize();
  

  return (
    <div className="flex flex-col w-full h-full bg-white p-4 rounded-xl  shadow-md ">
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
            className={`flex  ${size.width<=768?"flex-col":""} items-start gap-[2%] w-[80%]  `}
          >
            <div className="flex gap-[2px] items-center justify-center">
              <div className="flex gap-[2px] ">
                <img src="/darkbluedot.svg" alt="" />
              </div>
              <div class="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
                {" "}
                Controllable
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
            <div className="flex gap-[2px] ">
              <div>
                <img src="/Bficons/blackdot.svg" alt="" />
              </div>
              <div class="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
                    Non-Controllable
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
        <div className={`flex gap-[18px]  h-auto w-full`}>
            <RcawaterfallChart series={series} options={options}/>
            
         </div>
      )}
    </div>
  );
}

export default Rca;
