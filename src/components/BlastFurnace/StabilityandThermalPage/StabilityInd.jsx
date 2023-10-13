import React, { useEffect, useState } from "react";
import Guagecomp from "../../Charts/BF_Charts/Guagecomp";
import LineAreaChart from "../../Charts/BF_Charts/LineAreaChart";
import RangeTable from "../../Charts/BF_Charts/RangeTable";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import Mymodal from "../BF_Components/Mymodal";
import { useWindowSize } from "@uidotdev/usehooks";

function StabilityInd({ isExpanded1, handleToggle1 ,fetcheddata,client}) {
  const size = useWindowSize();
 
  const [rangeAreaData,setRangeAreaData]=useState( fetcheddata.stack_pressure.map((item) => ({
    x: item.x,
    y: item.y,
  })))
  const [lineAreaData,setLineAreaData]=useState(fetcheddata.stack_pressure.map((item) => ({
    x: item.x,
    y: item.z,
  })))
 
  const [Lineareachart, setLineareachart] = useState({
    series: [
      {
        type: "rangeArea",
        name: "Optimal Range Area",

        data:rangeAreaData
        //  [
        //   {
        //     x: "PMStack Press1",
        //     y: [2.6, 3.0],
        //   },
        //   {
        //     x: "PMStack Press2",
        //     y: [2.5, 2.6],
        //   },
        //   {
        //     x: "PMStack Press3",
        //     y: [2.7, 2.9],
        //   },
        //   {
        //     x: "PMStack Press5",
        //     y: [2.0, 3.0],
        //   },
        // ],
      },
      {
        type: "line",
        name: "Current Stack Pressure",
        data:lineAreaData,
        //  [
        //   {
        //     x: "PMStack Press1",
        //     y: 2.8,
        //   },
        //   {
        //     x: "PMStack Press2",
        //     y: 2.7,
        //   },
        //   {
        //     x: "PMStack Press3",
        //     y: 2.9,
        //   },
        //   {
        //     x: "PMStack Press5",
        //     y: 2.9,
        //   },
        // ],
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
        tickPlacement: "on",

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
            fontSize: "10px",
          },
        },
         tooltip: {
          enabled: false,
        },
      },

      yaxis: {
        opposite: true,
        labels: {
          rotate: -90,
        },
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
        borderColor: "#EBEBEB",
        strokeDashArray: 4,
        width: 4,
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          bottom: 80,
        },
      },
      tooltip: {

        custom: function({series, seriesIndex, dataPointIndex, w}) {
          var data1 = w.globals.initialSeries[0].data[dataPointIndex];
          var data2 = w.globals.initialSeries[1].data[dataPointIndex];
         
          return '<div class=" relative bg-white border border-gray-300 shadow-md rounded-md  flex p-9 flex-col gap-[25px] h-[200px] w-[120px]" >' +
          '<p class="absolute bottom-[29%] left-[-40px] font-bold mb-2 rotate-[-90deg] mt-4"> ' + data1.x +':'+ '</p>' +
          '<p  class="absolute bottom-[45%] left-[13px] font-normal rotate-[-90deg] "> Optimal Range: '+"[" + data1.y[0]+"-"+ data1.y[1]+ "]"+'</p>' +
          '<p class="absolute bottom-[20%] left-[5px] font-normal mt-4 mb-2 rotate-[-90deg] p-2 bg-green-200"> Current: '+  data2.y+'</p>' +
          
          '</div>';
        },
        fixed: {
          enabled: true,
          position: "leftCenter",
          offsetX: 0,
          offsetY: 0,
        },
      }
    },
  });


  const [guagepercent,setGuagepercent]=useState(fetcheddata.stability_indicator_chart[0].value)

  return (
    <div className="flex flex-col w-full h-full  bg-white p-4 rounded-xl  shadow-md ">
    {/* top part */}
    <div className="flex justify-between items-start w-[100%]">
      {/* stability ind top */}
      <div className="flex flex-col items-start justify-center gap-[12px] w-[572px]">
        <div className="flex items-center gap-[8px]">
          {" "}
          <div className="  text-[22px] text-[#3E3C42] font-medium">
            <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
              Stability Indicator
            </p>
          </div>
          <div className="">
            <Mymodal
              imageone={"/Bficons/stabilityindicatorTop.svg"}
              imageTwo={"/Bficons/stabilityindicatorBottom.svg"}
            />
          </div>
        </div>
        <div className={`flex items-start gap-[2%] w-[80%]   `}></div>
      </div>
      <div className="flex w-[100px] justify-between fill-white drop-shadow-md  ">
        <div className="flex justify-center items-center  w-[50px]">
          <Mymodal
            imageone={"/Bficons/stabilityindtopcard.svg"}
            imageTwo={""}
          />
        </div>
        <div>
          <img
            src="/dropicon.svg"
            alt=""
            onClick={handleToggle1}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
    {/* bottom part */}
    {isExpanded1 && (
      <div
        className={`grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5
         w-full gap-[18px] h-auto  transition-all duration-300 
         border-red-500 
        `}
      >
        {/* guagechart component */}
        <div className={`flex flex-col w-full col-span-1   h-full p-2  gap-3 justify-center items-center     bg-white  rounded-xl shadow-md`}
        >
          <p className="text-[18px] font-semibold text-[#3E3C42]">
            {/* Stability Indicator */}
          </p>
          <Guagecomp  guagepercent={guagepercent}/>
          <div className="flex w-[90%] gap-2  justify-between">
            <p className="w-[45%] bg-[#D9E7D3] text-center text-[15px]  rounded-xl">
              Unstable
            </p>
            <p className="w-[45%] bg-[#69B04B] text-center  text-[white]  text-[15px] rounded-xl">
              Stable
            </p>
          </div>
          <div className="flex w-full justify-center gap-3 text-center text-2xl font-semibold">
           
            <p className="text-[18px] text-[#938F96]">Current</p>
            <p className="text-[18px] ">{guagepercent}%</p>
          </div>
        </div>

        {/* stack pressure */}
        <div className="col-span-2  w-full  shadow-md p-2    border-red-500">
          {/* top */}
          <div className="w-full">
            <div className="flex flex-col items-start justify-center gap-[12px] w-[572px]">
              <div className="flex items-center gap-[8px]">
                {" "}
                <div className="  text-[22px] text-[#3E3C42] font-medium">
                  <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
                    Stack Pressure
                  </p>
                </div>
                <div className="text-neutral-n-80 text-[#CAC5CD]  text-[16px] font-normal leading-normal">
                  Bar
                </div>
              </div>
              <div className={`flex  ${size.width<800? "flex-col":""} items-start gap-[2%] w-[80%]  `}>
                <div className="flex gap-[2px] items-center justify-center">
                  <div className="flex gap-[2px] ">
                    <img src="/darkbluedot.svg" alt="" />
                  </div>
                  <div className="text-gray-600 mt-[-9px] text-center  text-xs font-normal leading-normal">
                    {" "}
                    Current Stack Pressure
                  </div>
                </div>
                <div className="flex gap-[2px] ">
                  <div>
                    <img src="/lightgreendot.svg" alt="" />
                  </div>
                  <div className="text-gray-600 text-center  text-xs font-normal leading-normal">
                    Optimal Range
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* chart */}
          <div className="w-full h-full overflow-x-auto">
          <div className={`  ${size.width>1440? "w-full h-full": "w-[320px] h-[400px] "}  `}>
            <LineAreaChart Lineareachart={Lineareachart} />
          </div>
          </div>
        </div>

        {/* Range bar */}
        <div className=" col-span-2 w-full overflow-x-auto ">
        <div className={`
         ${size.width>1440? "w-full": "w-[380px]"} 
         
          h-full shadow-md p-2    `}>
          <RangeTable  fetcheddata={fetcheddata.stack_parameters}/>
        </div>
        </div>
      </div>
    )}
  </div>
  );
}

export default StabilityInd;
