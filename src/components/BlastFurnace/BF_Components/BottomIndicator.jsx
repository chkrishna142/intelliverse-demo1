import { useState } from "react";

export default function BottomIndicator() {
  const [blockC, setBlockc] = useState(2.3);
  const [blockD, setBlockd] = useState(7.3);
  const [blockE, setBlocke] = useState(7.3);

  return (
    <div class="bg-[#F1F7FF] flex text-center w-[100%] p-3 h-[80px] rounded-xl">
      <div class="w-[15%]  flex h-full items-center justify-center ">
        <p class="text-[14px] font-semibold text-left  items-center justify-center">
          Current Ore-Coke ratio
        </p>
      </div>
      <div class="w-[28%] p-3 flex justify-center  h-full gap-1 ">
        <div class="w-[75%] flex gap-1  justify-center items-center">
          <p class="text-[22px] font-normal text-[#605D64]">Block C -</p>
          <p class="text-[22px] font-semibold text-[#084298]">{blockC}</p>
        </div>
        <div class="w-[25%] flex ml-[-10px] items-center justify-center">
          {blockC > 5 ? (
            <img src="/increasered.svg" alt="" />
          ) : (
            <img src="/normalindicator.svg" alt="" />
          )}
        </div>
      </div>
      <div class="w-[28%] flex justify-center  h-full gap-1">
        <div class="w-[75%] flex gap-1  justify-center items-center">
          <p class="text-[22px] font-normal text-[#605D64]">Block D -</p>
          <p class="text-[22px] font-semibold text-[#084298]">{blockD}</p>
        </div>
        <div class="w-[25%] ml-[-15px] flex items-center justify-center">
          {blockD > 5 ? (
            <img src="/increasered.svg" alt="" />
          ) : (
            <img src="/normalindicator.svg" alt="" />
          )}
        </div>
      </div>
      <div class="w-[28%] flex justify-center   h-full gap-1">
        <div class="w-[75%] flex gap-1  justify-center items-center">
          <p class="text-[22px] font-normal text-[#605D64]">Block E -</p>
          <p class="text-[22px] font-semibold text-[#084298]">{blockE}</p>
        </div>
        <div class="w-[25%] ml-[-15px] flex items-center justify-center">
          {blockE > 5 ? (
            <img src="/increasered.svg" alt="" />
          ) : (
            <img src="/normalindicator.svg" alt="" />
          )}
        </div>
      </div>
    </div>
  );
}
