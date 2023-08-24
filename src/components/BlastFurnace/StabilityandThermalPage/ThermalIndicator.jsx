import React, { useEffect, useState } from "react";
// import RcawaterfallChart from "../Charts/RcawaterfallChart";
// import Guagecomp from "../Charts/Guagecomp";
// import StackpressureChart from "../Charts/LineAreaChart";
// import RangeTable from "../Charts/Rangetable";
// import LineAreaChart from "../Charts/LineAreaChart";
// import ThermalColorHeatMap from "../Charts/ThermalColorHeatMap";
// import TemperatureDashboard from "../Charts/TemperatureDashboard";

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
    <div className="flex flex-col w-full h-full bg-white p-4 rounded-xl shadow-md ">
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
        <div onClick={handleToggle3}>
          <img src="/dropicon.svg" alt="" />
        </div>
      </div>
      {/* bottom */}
      
    </div>
  );
}

export default ThermalIndicator;



// {isExpanded3 && (
//   <div className={`flex gap-[18px] ${flexDirection} h-auto w-full  `}>
//     <div className={`flex gap-[18px] ${flexDirection} h-auto  w-full`}>
//       {/* thermal color indicator*/}
//       <div class="flex flex-col w-[20%] h-full p-4  gap-3 items-center  bg-white  rounded-xl shadow-md">
//         <p class="text-[18px] text-left  w-full font-semibold text-[#3E3C42]">
//           Thermal Indicator
//         </p>
//         <p class="text-[12px] text-left w-full  font-normal text-[#AEA9B1]">
//           Last 1 Hour
//         </p>
//       </div>

//       {/* Target Ranges for Stave Temperature */}
//       <div class="w-[35%] h-[100%]  shadow-md p-1">
//         {/* top */}
//         <div class="w-full">
//           <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
//             <div className="flex items-center gap-[8px]">
//               {" "}
//               <div class=" font-roboto text-[22px] text-[#605D64] font-medium">
//                 <p className="!text-base  sm:!text-base md:!text-base lg:!text-[22px] ">
//                   Target Ranges for Stave Temperature
//                 </p>
//               </div>
//               <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
//             </div>
//             <div
//               className={`flex items-start gap-[2%] w-[80%] ${
//                 windowWidth < 577 ? "flex-col" : ""
//               }  `}
//             >
//               <div className="flex gap-[2px] items-center justify-center">
//                 <div className="flex gap-[2px] ">
//                   <img src="icons/bluedot.svg" alt="" />
//                   {/* <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="30"
//                   height="30"
//                   viewdiv="0 0 30 30"
//                   fill="none"
//                 >
//                   <g filter="url(#filter0_d_1097_11025)">
//                     <circle cx="15" cy="11" r="7" fill="#6CA6FC" />
//                   </g>
//                   <defs>
//                     <filter
//                       id="filter0_d_1097_11025"
//                       x="0"
//                       y="0"
//                       width="30"
//                       height="30"
//                       filterUnits="userSpaceOnUse"
//                       color-interpolation-filters="sRGB"
//                     >
//                       <feFlood
//                         flood-opacity="0"
//                         result="BackgroundImageFix"
//                       />
//                       <feColorMatrix
//                         in="SourceAlpha"
//                         type="matrix"
//                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                         result="hardAlpha"
//                       />
//                       <feOffset dy="4" />
//                       <feGaussianBlur stdDeviation="4" />
//                       <feComposite in2="hardAlpha" operator="out" />
//                       <feColorMatrix
//                         type="matrix"
//                         values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
//                       />
//                       <feBlend
//                         mode="normal"
//                         in2="BackgroundImageFix"
//                         result="effect1_dropShadow_1097_11025"
//                       />
//                       <feBlend
//                         mode="normal"
//                         in="SourceGraphic"
//                         in2="effect1_dropShadow_1097_11025"
//                         result="shape"
//                       />
//                     </filter>
//                   </defs>
//                 </svg> */}
//                 </div>
//                 <div class="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
//                   {" "}
//                   Current Temperature
//                 </div>
//               </div>
//               <div className="flex gap-[2px] ">
//                 <div>
//                   <img src="icons/lightgreendot.svg" alt="" />
//                 </div>
//                 <div class="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
//                   Optimal Range
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* chart */}
//         <div class="w-full ">
//           <LineAreaChart Lineareachart={Lineareachart} />
//         </div>
//       </div>

//       {/* Range bar */}
//       <div class="w-[45%] flex h-full ">
//         <div class="w-[80%] h-[100%]">
//           {/* <ThermalColorHeatMap /> */}
//           <TemperatureDashboard data={dummyHeatData} />
//         </div>

//         <div class="w-[20%] p-2 border-2 border-red-500">
//           <div class="flex w-full border-2 border-red-500">
//             <div class=" w-full border-2 border-red-500">
//               <img src="icons/redheatdiv.svg" alt="" />
//             </div>
//             <div class="border-2 border-red-500">
//               <p class="text-[12px] text-[#605D64]">
//                 Stave temperature is 10% higher than Upper limit temp
//               </p>
//             </div>
//           </div>
//           <div>2</div>
//           <div>3</div>
//           <div>4</div>
//         </div>
//       </div>
//     </div>
//   </div>
// )}
