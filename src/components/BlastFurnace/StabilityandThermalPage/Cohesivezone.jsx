import React, { useEffect, useState } from "react";
import Linechart from "../../Charts/BF_Charts/Linechart";
import Mymodal from "../BF_Components/Mymodal";
import { useWindowSize } from "@uidotdev/usehooks";
import ReactApexChart from "react-apexcharts";

function Cohesivezone({ isExpanded5, handleToggle5 }) {
  const size = useWindowSize();
  const [cohesivechart, setCohesivechart] = useState({
    series: [
      {
        data: [10, 44, 44, 122, 122, 122, 122, 63, 63, 63, 63, 10, 10],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        type: "line",
        // height: "300px",
      },
      stroke: {
        curve: "stepline",
        width: 2,
      },
      colors: ["#FFFFFF"],

      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: "#90A4AE",
        strokeDashArray: 5,
        row: {
          colors: [
            "#E46962",
            "#E46962",
            "#69B04B",
            "#69B04B",
            "rgba(105, 176, 75, 0.50)",
            "rgba(105, 176, 75, 0.50)",
          ], // Set alternating colors for grid rows
        },
      },

      yaxis: {
        tickAmount: 5,
        labels: {
          formatter: function (value) {
            // Define custom labels based on the value
            // if (value > 60) {
            //   return "^";
            // } else if (value <=60 && value > 40) {
            //   return "L";
            // } else if (value <=40 ) {
            //   return "W";
            // }
            // Return an empty string for other values
            return "";
          },
        },
      },
      xaxis: {
        categories: [
          "12 pm",
          "1 pm",
          "2 pm",
          "3 pm",
          "4 pm",
          "5 pm",
          "6 pm",
          "7 pm",
          "8 pm",
          "9 pm",
          "10 pm",
          "11 pm",
          "12 am",
        ], // Set the time labels for X-axis
      },
    },
  });

  return (
    <div className="flex flex-col  w-full h-full bg-white p-4 rounded-xl  shadow-md">
      {/* top */}
      <div class="flex justify-between w-full">
        <div class="flex flex-col items-start justify-center gap-[12px] w-[90%]">
          <div className="flex items-center gap-[2px] ">
            {" "}
            <div class=" font-roboto text-[22px] text-[#3E3C42] font-medium ">
              <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
                Cohesive Zone
              </p>
            </div>
            {/* <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal">
             
            </div> */}
            <div className="flex justify-center items-center  w-[40px] ">
              <Mymodal
                imageone={"/Bficons/cohesiveTop.svg"}
                imageTwo={"/Bficons/cohesiveBottom.svg"}
              />
            </div>
          </div>
        </div>
        <div className=" w-[10%] flex justify-end ">
          <img
            src="/dropicon.svg"
            alt=""
            onClick={handleToggle5}
            style={{ cursor: "pointer" }}
            className="shadow:md"
          />
        </div>
      </div>
      {/* bottom */}
      {isExpanded5 && (
        <div
          className={`flex ${
            size.width <= 768 ? "flex-col" : ""
          }  gap-[12px] w-full  h-full mt-2`}
        >
          <div
            className={`  ${
              size.width <= 768 ? "w-full" : "w-[22%]"
            }  flex flex-col items-start h-full  p-[14px]   rounded-[12px] bg-blue-50 ;
           `}
          >
            <div className="w-full h-full flex flex-col gap-3">
              <div className="w-full flex  justify-evenly items-center">
                <div className="w-[50px] text-center text-[#CAC5CD] text-[14px] ">
                  Stave Index
                </div>
                <div className="w-[100px] text-center text-[#CAC5CD] text-[14px] ">
                  TB
                </div>
                <div className="w-[100px] text-center text-[#CAC5CD] text-[14px] ">
                  Cohesive zone shape
                </div>
              </div>
              <div className="w-full flex  justify-evenly items-center">
                <div className="w-[50px] text-center text-[#938F96]">
                  {"<0"}
                </div>
                <div className="w-[100px] text-center text-[#938F96]">
                  {"53<TB<57"}
                </div>
                <div className="w-[100px] text-center text-[#938F96]">^</div>
              </div>
              <div className="w-full flex  justify-evenly items-center">
                <div className="w-[50px] text-center text-[#938F96]">
                  {"<0"}
                </div>
                <div className="w-[100px] text-center text-[#938F96]">
                  {"48<TB<53"}
                </div>
                <div className="w-[100px] text-center text-[#938F96]">L</div>
              </div>
              <div className="w-full flex  justify-evenly items-center">
                <div className="w-[50px] text-center text-[#938F96]">
                  {"<0"}
                </div>
                <div className="w-[100px] text-center text-[#938F96]">
                  {"TB<48"}
                </div>
                <div className="w-[100px] text-center text-[#938F96]">W</div>
              </div>
            </div>
          </div>
          {/* charts */}
          <div className="w-full h-full flex  items-center ">
            <div className=" w-[5%] h-[80%] flex flex-col ">
              <div className="flex  h-[33%] justify-center items-center">^</div>
              <div className="flex  h-[33%] justify-center items-center">L</div>
              <div className="flex  h-[33%] justify-center items-center">W</div>
            </div>
            <div
              className={`  ${
                size.width <= 768 ? "w-full" : "w-[100%]"
              }  flex flex-col  h-full    items-start    gap-[28px]   rounded-[12px] `}
            >
              <div id="chart" className="w-full h-full  ml-[-30px]">
                <ReactApexChart
                  options={cohesivechart.options}
                  series={cohesivechart.series}
                  type="line"
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cohesivezone;
