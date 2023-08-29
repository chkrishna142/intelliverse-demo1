import React, { useEffect, useState } from "react";
import Fuelrecommend from "./Fuelrecommend";

function Overviewrecommendation({
  isExpanded2,
  handleToggle2,
  series,
  options,
}) {
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
        <div className="w-full h-[150px] grid grid-cols-6 gap-0">
          <div className="col-span-1 items-center justify-between p-2  ">
            <div className="flex  items-center h-[37%] justify-center">
              <p className="text-[#3E3C42] font-bold"></p>
              <p className="text-[#939393]"></p>
            </div>
            <div className="flex flex-col h-[50%] items-center justify-between">
              {/* <Fuelrecommend recommendedValue={18} currentValue={16} /> */}
              {/* legends */}
              <div className="flex gap-[2px] w-full">
                <img src="/Bficons/skyblue.svg" alt="" />
                <p className="text-[#79767D] text-[12px]">Current value </p>
              </div>
              <div className="flex w-full">
                <img src="/Bficons/tealblue.svg" alt="" />
                <p  className="text-[#79767D] text-[12px]">Recommended value</p>
              </div>
            </div>
          </div>
          {/* blast moisture */}
          <div className="col-span-1 items-center justify-between p-2 ">
            <div className="flex  items-center justify-center gap-2">
              <p className="text-[#3E3C42] font-bold">Blast Moisture</p>
              <p className="text-[#939393] text-[12px]">%</p>
            </div>
            <div className="mt-[30px]">
              <Fuelrecommend recommendedValue={18} currentValue={16} />
            </div>
          </div>
          {/* cold blast volume */}
          <div className="col-span-1 items-center justify-between p-2 ">
            <div className="flex  items-center justify-center gap-2 ">
              <p className="text-[#3E3C42] font-bold  whitespace-nowrap">Cold Blast Volume</p>
              <p className="text-[#939393]  text-[12px]">Nm^3/hr</p>
            </div>
            <div className="mt-[30px]">
              <Fuelrecommend recommendedValue={5750} currentValue={5950} />
            </div>
          </div>
          {/* raft */}
          <div className="col-span-1 items-center justify-between p-2 ">
            <div className="flex  items-center justify-center">
              <p className="text-[#3E3C42] font-bold">RAFT</p>
              <p className="text-[#939393]  text-[12px]">Celsisus</p>
            </div>
            <div className="mt-[30px]">
              <Fuelrecommend recommendedValue={2263} currentValue={2210} />
            </div>
          </div>
          {/* pci rate */}
          <div className="col-span-1 items-center justify-between p-2 ">
            <div className="flex  items-center justify-center">
              <p className="text-[#3E3C42] font-bold">PCI Rate </p>
              <p className="text-[#939393]  text-[12px]">kg/tHM</p>
            </div>
            <div className="mt-[30px]">
              <Fuelrecommend recommendedValue={195} currentValue={250} />
            </div>
          </div>
          {/* o2 enrichment */}
          <div className="col-span-1 items-center justify-between p-2 ">
            <div className="flex  items-center justify-center">
              <p className="text-[#3E3C42] font-bold">O2 Enrichment</p>
              <p className="text-[#939393]  text-[12px]">%</p>
            </div>
            <div className="mt-[30px]">
              <Fuelrecommend recommendedValue={9.4} currentValue={10.1} />
            </div>
          </div>
         
         
        </div>

        //  <Fuelrecommend recommendedValue={18} currentValue={16} />
      )}
    </div>
  );
}

export default Overviewrecommendation;
