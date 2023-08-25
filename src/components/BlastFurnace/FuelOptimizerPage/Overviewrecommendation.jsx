
import React, { useEffect, useState } from "react";




function Overviewrecommendation({ isExpanded2, handleToggle2 ,series,options}) {
  
 
  

  return (
    <div className="flex flex-col w-full h-full bg-white p-4 rounded-xl  shadow-md ">
      {/* top */}
      <div class="flex justify-between w-full">
        <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
          <div className="flex items-center gap-[8px]">
            {" "}
            <div class=" font-roboto text-[22px] text-[#3E3C42] font-medium">
              <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
              Recommendation
              </p>
            </div>
            <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
          </div>
          
        </div>
        <div onClick={handleToggle2}>
          <img src="/dropicon.svg" alt="" />
        </div>
      </div>
      {/* bottom */}
      {isExpanded2 && (
       <>Recommendations</>
      )}
    </div>
  );
}

export default Overviewrecommendation;
