import React, { useEffect, useState } from "react";
import Guagecomp from "../../Charts/BF_Charts/Guagecomp";
import LineAreaChart from "../../Charts/BF_Charts/LineAreaChart";
import RangeTable from "../../Charts/BF_Charts/RangeTable";
import { InfoOutlineIcon} from '@chakra-ui/icons'
import Mymodal from "../BF_Components/Mymodal";
// import Guagecomp from "../Charts/Guagecomp";
// import StackpressureChart from "../Charts/LineAreaChart";
// import RangeTable from "../Charts/Rangetable";
// import LineAreaChart from "../Charts/LineAreaChart";

function StabilityInd({ isExpanded1, handleToggle1 }) {
  

  const [Lineareachart, setLineareachart] = useState({
    series: [
      {
        type: "rangeArea",
        name: "Optimal Range Area",
       

        data: [
          {
            x: "PMStack Press1",
            y: [2.6, 3.0],
          },
          {
            x: "PMStack Press2",
            y: [2.5, 2.6],
          },
          {
            x: "PMStack Press3",
            y: [2.7, 2.9],
          },
          {
            x: "PMStack Press5",
            y: [2.0, 3.0],
          },
          
         
        ],

      },
      {
        type: "line",
        name: "Current Stack Pressure",
        data: [
          {
            x: "PMStack Press1",
            y: 2.8,
          },
          {
            x: "PMStack Press2",
            y: 2.7,
          },
          {
            x: "PMStack Press3",
            y: 2.9,
          },
          {
            x: "PMStack Press5",
            y: 2.9,
          },
          
        ],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        // height: 350,
        type: "rangeArea",
        animations: {
          speed: 400,
        },
       
      },
      colors: ["rgba(105, 176, 75, 0.28)", "#3A74CA"],
      dataLabels: {
        enabled: false,
      },
     
      fill: {
        // opacity: [0.24, 0.24, 1, 1],
      },
      forecastDataPoints: {
        count: 0,
      },
      stroke: {
        show: true,
        curve: "straight",
        lineCap: "butt",
        width: [0, 2], // Width for the rangeArea and line series
      },
      legend: {
        show: false,
        customLegendItems: ["Team B", "Team A"],
        inverseOrder: true,
      },

      markers: {
        hover: {
          sizeOffset: 5,
        },
      },
      
     
     
    },
  });





  return (
    
    <div class="flex flex-col w-full h-full bg-white p-4 rounded-xl  shadow-md ">
      {/* top part */}
      <div class="flex justify-between items-start w-[100%]">
        {/* stability ind top */}
        <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
          <div className="flex items-center gap-[8px]">
            {" "}
            <div class="  text-[22px] text-[#3E3C42] font-medium">
              <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
                Stability Indicator
              </p>
            </div>
            <div className="">
           
            <Mymodal imageone={"/Bficons/stabilityindicatorTop.svg"} imageTwo={"/Bficons/stabilityindicatorBottom.svg"}/>
            </div>
          </div>
          <div
            className={`flex items-start gap-[2%] w-[80%]   `}
          >
          
          </div>
        </div>
        <div class="flex w-[100px] justify-between fill-white drop-shadow-md  " >
          <div className="flex justify-center items-center  w-[50px]">
          <Mymodal  imageone={"/Bficons/stabilityindtopcard.svg"} imageTwo={""} />

          </div>
          <div >
          <img src="/dropicon.svg" alt="" onClick={handleToggle1} style={{ cursor: 'pointer' }}  />

          </div>
        </div>
      </div>
      {/* bottom part */}
      {isExpanded1 && (
        <div className={`flex w-full gap-[18px] h-auto  transition-all duration-300 ${isExpanded1 ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0'}`}>
          {/* guagechart component */}
          <div class="flex flex-col w-[20%] h-full p-2  gap-3 items-center  bg-white  rounded-xl shadow-md">
            <p class="text-[18px] font-semibold text-[#3E3C42]">
              Stability Indicator
            </p>
            <Guagecomp />
            <div class="flex w-[90%]  justify-between">
              <p className="w-[100px] bg-[#D9E7D3] text-center  rounded-xl">
                Unstable
              </p>
              <p className="w-[100px] bg-[#69B04B] text-center   rounded-xl">
                Stable
              </p>
            </div>
          </div>

          {/* stack pressure */}
          <div class="w-[35%] h-[100%]  shadow-md p-2">
            {/* top */}
            <div class="w-full">
              <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
                <div className="flex items-center gap-[8px]">
                  {" "}
                  <div class="  text-[22px] text-[#3E3C42] font-medium">
                    <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
                      Stack Pressure
                    </p>
                  </div>
                  <div class="text-neutral-n-80 text-[#CAC5CD]  text-[16px] font-normal leading-normal">Bar</div>
                </div>
                <div
                  className={`flex items-start gap-[2%] w-[80%]  `}
                >
                  <div className="flex gap-[2px] items-center justify-center">
                    <div className="flex gap-[2px] ">
                      <img src="/darkbluedot.svg" alt="" />
                      
                    </div>
                    <div class="text-gray-600 mt-[-9px] text-center  text-xs font-normal leading-normal">
                      {" "}
                      Current Stack Pressure
                    </div>
                  </div>
                  <div className="flex gap-[2px] ">
                    <div>
                      <img src="/lightgreendot.svg" alt="" />
                    </div>
                    <div class="text-gray-600 text-center  text-xs font-normal leading-normal">
                      Optimal Range
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* chart */}
            <div class="w-full ">
              <LineAreaChart Lineareachart={Lineareachart}/>
            </div>
          </div>

          {/* Range bar */}
          <div class="w-[45%] h-full shadow-md p-2">
            <RangeTable />
          </div>
        </div>
      )}
    </div>
  );
}

export default StabilityInd;
