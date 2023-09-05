import React, { useEffect, useState } from "react";
import ThermalIndThermo from "../BF_Components/ThermalIndThermo";
import Thermalareachart from "../BF_Components/Thermalareachart";
import Thermalheatmap from "../BF_Components/Thermalheatmap";
import Mymodal from "../BF_Components/Mymodal";


function ThermalIndicator({ isExpanded3, handleToggle3 }) {
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
          speed: 100,
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
        curve: "smooth",
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

  const dummyHeatData = [
    { name: "T18 +41807 R15",  temperature1: 28, temperature2: 28,temperature3: 28, temperature4: 28,  },
    { name: "T18 +41807 R14",  temperature1: 28, temperature2: 28,temperature3: 28, temperature4: 28,  },
    { name: "T18 +41807 R13",  temperature1: 28, temperature2: 32,temperature3: 28, temperature4: 28,  },
    { name: "T18 +41807 R12",  temperature1: 28, temperature2: 28,temperature3: 28, temperature4: 28,  },
    { name: "T18 +41807 R11",  temperature1: 28, temperature2: 28,temperature3: 28, temperature4: 28,  },
    { name: "T18 +41807 R11",  temperature1: 28, temperature2: 28,temperature3: 28, temperature4: 28,  },
    { name: "T18 +41807 R11",  temperature1: 28, temperature2: 28,temperature3: 28, temperature4: 28,  },
    { name: "T18 +41807 R11",  temperature1: 28, temperature2: 28,temperature3: 28, temperature4: 28,  },
    { name: "T18 +41807 R10",  temperature1: 28, temperature2: 28,temperature3: 28, temperature4: 28,  },
    { name: "T18 +41807 R10",  temperature1: 28, temperature2: 28,temperature3: 28, temperature4: 28,  },
    { name: "T18 +41807 R9",  temperature1: 28, temperature2: 28,temperature3: 28, temperature4: 28,  },
    { name: "T18 +41807 R19",  temperature1: 28, temperature2: 28,temperature3: 28, temperature4: 28,  },
    // ... and so on
  ];




  return (
    <div className="flex flex-col  h-full bg-white p-4 rounded-xl  shadow-md  ">
      {/* top */}
      <div class="flex justify-between w-full ">
        <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
          <div className="flex items-center gap-[8px]">
            {" "}
            <div class=" font-roboto text-[22px] text-[#3E3C42] font-medium">
              <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
                Thermal Indicator
              </p>
            </div>
            <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
          </div>
        </div>
        <div class="flex w-[100px] justify-between fill-white drop-shadow-md  " >
          <div className="flex justify-center items-center  w-[50px]">
          <Mymodal  imageone={"/Bficons/HeatmapIndTop.svg"} imageTwo={""} />

          </div>
          <div >
          <img src="/dropicon.svg" alt="" onClick={handleToggle3} style={{ cursor: 'pointer' }}  />

          </div>
        </div>
      </div>
      {/* bottom */}
      {isExpanded3 && (
  <div className={`flex  gap-[18px]  h-auto w-full  `}>
    <div className={`flex gap-[18px]  h-auto  w-full`}>
      {/* thermal color indicator*/}
      <div class="flex flex-col w-[20%] h-full p-4  gap-3 items-center  bg-white  rounded-xl shadow-md">
        <div className="flex gap-2 justify-center items-center">
        <p class="text-[18px] text-left  w-full font-semibold text-[#3E3C42]">
          Thermal Indicator
        </p>
        <Mymodal imageone={"/Bficons/ThermometerindicatorTop.svg"} imageTwo={""}/>
        </div>
        <p class="text-[12px] text-left w-full  font-normal text-[#AEA9B1]">
          Last 1 Hour
        </p>
        <div className="w-full h-[200px] ">
         <ThermalIndThermo maxTemperature={800} temperature={1000}/>

        </div>
      </div>

      {/* Target Ranges for Stave Temperature */}
      <div class="w-[35%] h-[100%]  shadow-md p-1">
        {/* top */}
        <div class="w-full">
          <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
            <div className="flex items-center gap-[8px]">
              {" "}
              <div class="flex gap-2 items-center font-roboto text-[22px] text-[#605D64] font-medium">
                <p className="!text-base  sm:!text-base md:!text-base lg:!text-[22px] ">
                  Target Ranges for Stave Temperature
                </p>
                <Mymodal imageone={"/Bficons/StavetempTop.svg"} imageTwo={""}/>
              </div>
              <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
            </div>
            <div
              className={`flex items-start gap-[2%] w-[80%]  `}
            >
              <div className="flex gap-[2px] items-center justify-center">
                <div className="flex gap-[2px] ">
                <img src="/darkbluedot.svg" alt="" />
                 
                </div>
                <div class="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
                  {" "}
                  Current Temperature
                </div>
              </div>
              <div className="flex gap-[2px] ">
                <div>
                <img src="/lightgreendot.svg" alt="" />
                </div>
                <div class="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
                  Optimal Range
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* chart */}
        <div class="w-full h-full  border-2 border-red-500">
          <Thermalareachart/>
        </div>
      </div>

      {/* Range bar */}
      <div class="w-[45%] flex h-full ">
        <div class="w-[100%] h-[100%]">
       <Thermalheatmap/>
        </div>

        
      </div>
    </div>
  </div>
)}
      
    </div>
  );
}

export default ThermalIndicator;




