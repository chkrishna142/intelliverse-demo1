
import React, { useEffect, useState } from "react";
import Linechart from "../../Charts/BF_Charts/Linechart";



function Overviewpci({ isExpanded2, handleToggle2 }) {

    const [fuelchart, setFuelchart] = useState({
        series: [
          {
            name: "Series 1",
            data: [182,176,181,189,183,181],
          },
          {
            name: "Series 2",
            data: [190,190,190, 190,190,190,],
          },
        ],
    
        options: {
          chart: {
            height: 350,
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
          colors: ["#77B6EA", "#545454"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
    
          grid: {
            borderColor: "#e7e7e7",
            strokeDashArray: 5,
            padding: {
              top: 0,
              right: 30,
              bottom: 0,
              left: 30,
            },
          },
          markers: {
            size: 1,
          },
          xaxis: {
            categories: [
              "11 pm",
              "11:10 pm",
              "11:20 pm",
              "11:30 pm",
              "11:40 pm",
              "11:50 pm",
              "12 pm",
            ],
            // title: {
            //   text: "Month",
            // },
          },
          yaxis: {
            // title: {
            //   text: "Temperature",
            // },
            // min: 500,
            // max: 550,
          },
          colors: ["#6CA6FC", "#2660B6"], // Set the colors for the first and second series
          
          dataLabels: {
            enabled: [true, false], // Enable for Series 1, disable for Series 2
            enabledOnSeries: [0],
            style: {
              fontSize: 12,
             
            },
            background: {
              enabled: true,
             
            },
          },
          stroke: {
            curve: "straight",
            width: [1, 1],
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
        },
      });
  

  

  return (
    <div className="flex flex-col w-full h-full bg-white p-4 rounded-xl  ">
      {/* top */}
      <div class="flex justify-between w-full">
        <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
          <div className="flex items-center gap-[8px]">
            {" "}
            <div class=" font-roboto text-[22px] text-[#3E3C42] font-medium">
              <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
              PCI
              </p>
            </div>
            <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal">kg/tHM</div>
          </div>
          <div
            className={`flex items-start gap-[2%] w-[80%]  `}
          >
            <div className="flex gap-[2px] items-center justify-center">
              <div className="flex gap-[2px] ">
                <img src="/Bficons/skyblue.svg" alt="" />
              </div>
              <div class="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
                {" "}
               Actual fuel rate
              </div>
            </div>
            <div className="flex gap-[2px] ">
              <div>
                <img src="/Bficons/darkblue.svg" alt="" />
              </div>
              <div class="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
                Baseline fuel rate
              </div>
            </div>
          </div>
        </div>
        <div onClick={handleToggle2}>
          <img src="/dropicon.svg" alt="" />
        </div>
      </div>
      {/* bottom */}
      {isExpanded2 && (
         
            <div className={`flex gap-[12px] w-full  h-full`}>
             
              {/* charts */}
              <div class={` w-[100%] flex flex-col  h-[300px]    items-start   p-[12px] gap-[28px] flex-shrink-0 rounded-[12px] `}>
                
                <div id="chart" className="h-[100%] w-full">
                <Linechart  chart={fuelchart}/>
                </div>
              </div>
            </div>
        
      )}
    </div>
  );
}

export default Overviewpci;
