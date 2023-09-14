import React from "react";
import { div, p, Table, TableRow, TableCell } from "@mui/material";
import LiquidGauge from "./LiquidGuage";

const HearthChart = () => {
  return (
    <div className="flex  flex-col   w-full h-full">
      
      <div className="flex flex-col md:flex-row gap-1 bg-white shadow-md p-1 items-center rounded">
        <div className="w-full md:w-[50%] border-r mt-3 mb-3">
          <img
            src="/Bficons/HearthLL.png"
            alt="Hearth Liquid"
            width={"80%"}
            style={{
              objectFit: "cover",
              objectPosition: "75% 50%",
              margin: "0 10% 0 10%",
            }}
            height={"80%"}
          ></img>
        </div>
        <div className="flex flex-col w-full md:w-[50%] mt-0 pt-0 mb-3 pl-3 pr-3">
          <p
            variant="h6"
            className="ml-auto mr-auto text-center text-[#426078] mt-0"
          >
            Liquid Levels
          </p>
          <LiquidGauge />
          <p
            variant="p"
            className="ml-auto mr-auto text-center text-[#426078] mt-1"
          >
            Time left to start casting
          </p>
          <p variant="p" className="ml-auto mr-auto text-center mt-1">
            00 : 30 : 10 hrs
          </p>
          <div>
            <table className="mt-3 w-full ">
              <tr
                className="bg-[#A6C4DC] h-[50px] text-[16px] "
               
              >
                <th className="font-normal">Time</th>
                <th className="font-normal">Production {"(in tonnes)"}</th>
              </tr>
              <tr className="h-[40px]">
                <td className="text-[#426078] border-l border-b text-center text-[14px]">
                  For the Day
                </td>
                <td className="border-r border-b text-center text-[14px]">1200</td>
              </tr>
              <tr className="h-[40px]">
                <td className="text-[#426078] border-l border-b text-center text-[14px]">
                  Month to Date
                </td>
                <td className="border-r border-b  text-center text-[14px]">20000</td>
              </tr>
              <tr className="h-[40px]">
                <td className="text-[#426078] border-l border-b text-center text-[14px]">
                  Year to Date
                </td>
                <td className="border-r border-b  text-center text-[14px]">1000000</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HearthChart;
