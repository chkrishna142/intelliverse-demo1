import React, { useEffect, useState } from "react";
import Guagecomp from "../../Charts/BF_Charts/Guagecomp";
import LineAreaChart from "../../Charts/BF_Charts/LineAreaChart";
import RangeTable from "../../Charts/BF_Charts/RangeTable";
import { InfoOutlineIcon} from '@chakra-ui/icons'
import Mymodal from "../BF_Components/Mymodal";
import { useWindowSize } from "@uidotdev/usehooks";


function StabilityInd({ isExpanded1, handleToggle1 }) {
  const size = useWindowSize();

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
        parentHeightOffset: 0,

        type: "rangeArea",
        animations: {
          speed: 500,
        },
        toolbar: {
          show: false,
        },

      },

      colors: ["rgba(105, 176, 75, 0.28)", "#6CA6FC"],
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: [0.24, 1],
      },
      stroke: {
        curve: "straight",
        width: [0, 2],
      },
      xaxis: {
        tickPlacement: 'on',

        // position:"left",
        labels: {
          show: true,
          minWidth: 120,
          maxWidth: 260,
          
         // offsetX: -15,
          offsetY: -0,
          rotate: -90,
          //rotateAlways: true,
          style: {
            colors: [],  
            fontSize: '10px',

          },


        }
      },
      
      yaxis: {

        opposite: true,
        labels:{
          rotate: -90,
        }

      },
      legend: {
        show: false,
        customLegendItems: ["Optimal Range", "Current Temperature"],
        inverseOrder: true,
        position: "top",
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        horizontalAlign: "left",
        labels: {
          colors: undefined,
          useSeriesColors: false,
        },
      },
      grid: {
        show: true,
        borderColor: '#EBEBEB',
        strokeDashArray: 4,
        width:4,
        position: 'back',
        xaxis: {
            lines: {
                show: true,

            }
        }, 
        yaxis: {
          lines: {
              show: false
          }
      }, 
        padding: {
          bottom: 50,
        },
      },
      tooltip: {
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          var data1 = w.globals.initialSeries[0].data[dataPointIndex];
          var data2 = w.globals.initialSeries[1].data[dataPointIndex];
         
          return '<div class="bg-white border border-gray-300 p-4 shadow-md rounded-md h-[100px] rotate-[-45]" >' +
          '<p class="font-bold mb-1"> ' + data1.x +':'+ '</p>' +
          '<p  class="mb-1"> Optimal Range: '+"[" + data1.y[0]+"-"+ data1.y[1]+ "]"+'</p>' +
          '<p> Current: '+  data2.y+'</p>' +
          
          '</div>';
        }
      }

    },
  });





  return (
    
    <div class="flex flex-col w-full h-full  bg-white p-4 rounded-xl  shadow-md ">
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
        <div className={`flex ${size.width<760 ? "flex-col":""}  w-full gap-[18px] h-auto  transition-all duration-300 ${isExpanded1 ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0'}`}>
          {/* guagechart component */}
          <div class={`flex flex-col  ${size.width<760 ? "w-[80%] justify-center items-center":"w-[20%]"}   h-full p-2  gap-3 items-center  bg-white  rounded-xl shadow-md`}>
            <p class="text-[18px] font-semibold text-[#3E3C42]">
              Stability Indicator
            </p>
            <Guagecomp />
            <div class="flex w-[90%]  justify-between">
              <p className="w-[100px] bg-[#D9E7D3] text-center  rounded-xl">
                Unstable
              </p>
              <p className="w-[100px] bg-[#69B04B] text-center  text-[white]  rounded-xl">
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
            <div class="w-full h-full">
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
