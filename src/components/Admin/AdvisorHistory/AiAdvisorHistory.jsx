import React, { useState, useEffect, useRef, useContext } from "react";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { Spinner } from "@chakra-ui/react";

const AiAdvisorHistory = () => {
  const [stateChanging, setStateChanging] = useState(false);

  const [fromTime, setFromTime] = useState(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000 + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );
  const [toTime, setToTime] = useState(
    new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );

  const handleClick = () => {
    setStateChanging(false);
    // apiCall();
  };

  return (
    <div className="mt-[3vh] w-full ">
      <div className="w-full flex gap-[8px]">
        <img src="/backtick.svg" alt="" />
        <p className="text-[20px] sm:text-[20px] font-semibold text-[#024D87]">
          Question history
        </p>
      </div>
      {/* bottom white background part */}
      <div className="flex flex-col w-full h-full gap-[14px]  bg-white p-4 rounded-xl   ">
        {/* batch */}
        <div
          className="flex justify-between w-full rounded-sm"
          style={{
            boxShadow:
              "4px 4px 12px 0px rgba(0, 0, 0, 0.10), -4px -4px 12px 0px rgba(0, 0, 0, 0.10)",
          }}
        >
          {/* batch pic */}
          <div className="flex gap-2">
            <div className="flex p-5 h-[150px] w-[150px] bg-[#00cefe] bg-opacity-10">
              <img src="/advisor/batchok.svg" alt="Badge" />
            </div>
            <div className="flex flex-col p-2">
              <p className="text-[#605D64] text-[20px]">
                Congratulations! You are now a{" "}
                <span className="font-semibold "> Frequent Inquirer</span>
              </p>
              <p className=" text-[#1C56AC] text-[14px] self-end">Read more</p>
            </div>
          </div>
          {/* current balance */}
          <div className=" p-4">
            <div className="flex justify-center gap-2 w-[230px] p-[8px] bg-[#FFFFD8] text-[16px]">
              <p className="text-[#605D64]">Current Balance</p>
              <div className="flex gap-2">
                <p className="text-[#3E3C42] font-semibold ">2000</p>
                {/* coin icons */}
                <img src="/token.svg" alt="coins" />
              </div>
            </div>
          </div>
        </div>

        {/* date picker */}
        <div className="p-5 pl-0 pr-6 gap-4 flex flex-col md:flex-row items-center ">
          <div className="">
            <FloatingInput
              text="From"
              type="date"
              setDateTime={setFromTime}
              value={fromTime}
            />
          </div>
          <div>
            <FloatingInput
              text="To"
              type="date"
              setDateTime={setToTime}
              value={toTime}
            />
          </div>
          <button
            className="text-center px-[16px] py-[10px] text-white text-xs md:text-base font-medium bg-[#084298] rounded-lg"
            onClick={handleClick}
          >
            {stateChanging ? <Spinner /> : "Show"}
          </button>
        </div>

        {/* graph and reports */}

        <div className="w-full flex gap-[32px]">
          {/* report */}
          <div className="flex flex-col w-[25%] gap-[30px]">
            <div className="w-full p-4">
              <p className="text-[#79767D] bg-[#f2f5f9] px-[16px] py-[8px] flex justify-center text-[14px] font-medium ">
                Queries resolved using AI advisor
              </p>
              <p className="flex justify-center bg-[#FAFAFA] text-[#3E3C42] text-[18px] px-[16px] py-[8px]">
                10
              </p>
            </div>
            <div className="w-full p-4">
              <p className="text-[#79767D] bg-[#f2f5f9] px-[16px] py-[8px] flex justify-center text-[14px] font-medium ">
                Tokens used
              </p>

              <p className="flex items-center gap-1 justify-center bg-[#FAFAFA] text-[#3E3C42] text-[18px] px-[16px] py-[8px] text-center">
                1{" "}
                <span className="">
                  {" "}
                  <img src="/token.svg" alt="coins" />
                </span>
              </p>
            </div>
          </div>
          {/* chart */}
          <div className="w-[70%] flex flex-col p-4">
            <div className="flex flex-col gap-1">
              <p className=" text-[#605D64] text-[14px] font-medium">
                AI Advisor credit usage
              </p>
              <p className="text-[12px] text-[#7AC958] flex gap-1">
                <span className="flex justify-center items-center">
                  <img src="/advisor/greenarrow.svg" alt="arrow" />
                </span>
                +150
                <span className="text-[12px] text-[#938F96]">
                  {" "}
                  increase in the last week
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAdvisorHistory;
