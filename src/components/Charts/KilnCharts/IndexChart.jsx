import { TriangleDownIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { useState } from "react";

const color = {
  Hot: ["#DC362E", "#F9DEDC"],
  Dusty: ["#FFC107", "#FFFFC4"],
};

const IndexChart = ({ type, value }) => {
  const vals = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-4 items-center justify-center w-full">
      <p className="text-sm text-[#605D64] font-medium w-[30%] whitespace-nowrap">
        {type} index:{" "}
      </p>
      <div className="flex gap-1 h-[40px] items-center w-[70%]">
        {vals.map((i) => {
          return (
            <div
              className="h-3 w-full rounded-xl relative flex items-center justify-center"
              style={{
                backgroundColor: i <= value ? color[type][0] : color[type][1],
                // border: `2px solid ${color[type]}`,
              }}
            >
              {i == value && (
                <div className="flex flex-col gap-0 absolute top-[-40px] items-center">
                  <p
                    className="px-2 py-1 font-bold text-sm rounded-md z-0 whitespace-nowrap bg-white"
                    style={{
                      boxShadow:
                        "4px 4px 4px 0px rgba(226, 240, 220, 0.51), -4px -4px 18px 0px rgba(226, 240, 220, 0.38)",
                      color: color[type][0]
                    }}
                  >
                    {value + ".00"}
                  </p>
                  <TriangleDownIcon
                    style={{
                      color: "#CCCCCC",
                      marginTop: "-5px",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndexChart;
