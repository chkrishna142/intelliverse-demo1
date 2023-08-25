import React, { useEffect, useState } from "react";
import Linechart from "../../Charts/BF_Charts/Linechart";
import BurdenDistributionChart from "../../Charts/BF_Charts/BurdenDistributionChart";
import BottomIndicator from "../BF_Components/BottomIndicator";

// import Linechart from "../Charts/Linechart";
// import BurdenDistributionChart from "../Charts/BurdenDistributionChart";
// import BottomIndicator from "../Charts/BottomIndicator";

function Recommendations({ isExpanded4, handleToggle4 }) {

    const [raftLineChart, setraftLineChart] = useState({
        series: [
          {
            name: "Actual Ratio",
            data: [10.8, 10.6, 10.4, 10.2, 10, 9.2, 9.8],
          },
        ],
      
        options: {
          // ... (other options you have defined)
      
          chart: {
            // height: 250,
            type: "line",
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2,
            },
            toolbar: {
              show: false,
            },
            animations: {
              enabled: false,
            },
          },
      
          stroke: {
            curve: "smooth",
          },
      
          grid: {
            borderColor: "#e7e7e7",
            strokeDashArray: 5,
            padding: {
              top: 0,
              right: 10,
              bottom: 0,
              left: 20,
            },
          },
          markers: {
            size: 1,
          },
          xaxis: {
            categories: [
              "10 Aug 11:00 ",
              "10 Aug 15:00",
              "10 Aug 19:00",
              "10 Aug 23:00",
              "10 Aug 3:00",
              "10 Aug 07:00",
              "10 Aug 11:00",
            ],
            // title: {
            //   text: "Month",
            // },
          },
      
          yaxis: {
            // title: {
            //   text: "Temperature",
            // },
            min: 9.0,
            max: 12.0,
            tickAmount: 5,
          },
      
          colors: ["#6CA6FC", "#69B04B"], // Set the colors for the first and second series
          dataLabels: {
            enabled: [true, false], // Enable for Series 1, disable for Series 2
            enabledOnSeries: [0],
            style: {
              fontSize: 14,
              colors: ["#EDF4FE"],
            },
            background: {
              enabled: true,
              foreColor: "#6CA6FC",
            },
          },
          stroke: {
            curve: "straight",
            width: [1, 2],
            // width: [1, 3, 3, 1],
            dashArray: [0, 6],
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
          },
      
          // Adding the annotations for y-axis range
          annotations: {
            yaxis: [
              {
                y: 10.2,
                y2: 10.7,
                borderColor: "#000",
                fillColor: "rgba(105, 176, 75, 0.16)",
                label: {
                  text: "Y-axis range",
                },
              },
            ],
          },
        },
      });
      

  return (
    <div className="flex flex-col w-full h-full bg-white p-4 rounded-xl  shadow-md "> 
      {/* top */}
      <div class="flex justify-between w-full ">
        <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
          <div className="flex items-center gap-[8px]">
            {" "}
            <div class=" font-roboto text-[22px] text-[#DC362E] font-medium">
              <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px]  font-semibold">
                Recommendations
              </p>
            </div>
            <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
          </div>
        </div>
        <div onClick={handleToggle4}>
          <img src="/dropicon.svg" alt="" />
        </div>
      </div>
      {/* bottom */}
      {isExpanded4 && (
        <div className={`flex gap-[18px] h-auto w-full  `}>
          <div className={`flex gap-[18px]  h-auto  w-full`}>
            {/* RAFT/Tuyere Velocity Trend*/}
            <div class="flex flex-col w-[35%] h-full p-4  gap-3 items-center  bg-white  rounded-xl  ">
              {/* top*/}
              <div class="w-full">
                <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
                  <div className="flex items-center gap-[8px]">
                    {" "}
                    <div class=" font-roboto text-[22px] text-[#605D64] font-medium">
                      <p class="text-[18px] text-left  w-full font-semibold text-[#3E3C42]">
                        RAFT/Tuyere Velocity Trend
                      </p>
                    </div>
                    <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal">
                      C.s/m
                    </div>
                  </div>
                  <div
                    className={`flex items-start gap-[2%] w-[80%]  `}
                  >
                    {/* svg legends */}
                    <div className="flex gap-[2px] items-center justify-center">
                      <div className="flex gap-[2px] ">
                        <img src="/darkbluedot.svg" alt="" />
                      </div>
                      <div class="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
                        {" "}
                        Actual Ratio
                      </div>
                    </div>
                    <div className="flex gap-[2px] ">
                      <div>
                        <img src="/lightgreendot.svg" alt="" />
                      </div>
                      <div class="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
                        Optimal Ratio
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full h-[300px] ">
              <Linechart  chart={raftLineChart}/>
              </div>
              <div class="text-[#FAFAFA] text-[16px] font-bold bg-[#DC362E] font-poppins w-full h-[40px] flex items-center justify-center  rounded-xl  ">
             <p class="text-[#FAFAFA] text-[16px] font-bold">Increase RAFT/Tuyere Velocity</p> 
              </div>
              
            </div>

            {/* Burden distribution ore-coke ratio */}
            <div class="w-[65%] h-[100%]">
              {/* top */}
              <div class="w-full">
                <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
                  <div className="flex items-center gap-[8px]">
                    {" "}
                    <div class=" font-roboto text-[22px] text-[#605D64] font-medium">
                      <p className="!text-base  sm:!text-base md:!text-base lg:!text-[22px] ">
                      Burden Distribution
                      </p>
                    </div>
                    <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal">Ore-Coke ratio</div>
                  </div>
                 
                </div>
              </div>
              {/* chart */}
              <div class="w-full ">
                <BurdenDistributionChart/>
              </div>
              <div class="w-full mt-[50px]">
              <BottomIndicator/>
              </div>
             
            </div>

           
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendations;
