
import React, { useEffect, useState } from "react";
import Linechart from "../../Charts/BF_Charts/Linechart";
import Mymodal from "../BF_Components/Mymodal";
import { useWindowSize } from "@uidotdev/usehooks";



function Overviewfuelrate({ isExpanded1, handleToggle1 }) {

  const size = useWindowSize();
    const [fuelchart, setFuelchart] = useState({
        series: [
          {
            name: "Actual fuel rate",
            data: [510, 505, 519, 525, 520, 520, 530, 519, 541, 512, 518, 530, 535],
          },
          {
            name: "Baseline fuel rate",
            data: [538, 538, 538, 538, 538, 538, 538, 538, 538, 538, 538, 538, 538],
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
          colors: ["#69B04B", "#525056"], // Set the colors for the first and second series
          
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
    <div className="flex flex-col w-full h-full bg-white p-4 rounded-xl  shadow-md ">
      {/* top */}
      <div class="flex justify-between w-full">
        <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
          <div className="flex items-center gap-[8px]">
            {" "}
            <div class=" font-roboto text-[22px] text-[#3E3C42] font-medium">
              <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
              Fuel Rate
              </p>
            </div>
            <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal">kg/tHM</div>
            <div className="flex justify-center items-center  w-[50px]">
          <Mymodal  imageone={"/Bficons/fuelrateTop.svg"} imageTwo={""} />

          </div>
          </div>
          <div
            className={`flex  ${size.width<=768?"flex-col":""} items-start gap-[2%] w-[80%]  `}
          >
            <div className="flex gap-[2px] items-center justify-center">
              <div className="flex gap-[2px] ">
                <img src="/Bficons/darkgreendot.svg" alt="" />
              </div>
              <div class="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
                {" "}
               Actual fuel rate
              </div>
            </div>
            <div className="flex gap-[2px] ">
              <div>
                <img src="/Bficons/blackdot.svg" alt="" />
              </div>
              <div class="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
                Baseline fuel rate
              </div>
            </div>
          </div>
        </div>
        <div onClick={handleToggle1}>
          <img src="/dropicon.svg" alt="" />
        </div>
      </div>
      {/* bottom */}
      {isExpanded1 && (
         
            <div className={`flex ${size.width<=768?"flex-col":""}  gap-[12px] w-full  h-full`}>
              <div
                class={`  ${size.width<=768?"w-full":"w-[25%]"}  flex flex-col items-start h-[300px]  p-[12px] gap-[28px] flex-shrink-0 rounded-[12px] bg-blue-100`}
              >
                {/* current fuel rate */}

                <div class="flex flex-col items-start gap-[8px]">
                  <p class="text-primary-p-10 text-[#084298] text-center font-roboto text-[18px] font-medium leading-normal">
                    540 kg/tHM
                  </p>
                  <p
                    class="text-neutral-n-70 font-roboto text-[14px] font-normal leading-normal"
                    style={{ color: "#938F96" }}
                  >
                    Current Fuel Rate{" "}
                  </p>
                </div>
                <div class="flex flex-col items-start gap-[8px]">
                  <p class="text-neutral-n-10 text-[#3E3C42] text-center font-roboto text-[18px] font-medium leading-normal">
                    540 kg/tHM
                  </p>
                  <p
                    class="text-neutral-n-70 font-roboto text-[14px] font-normal leading-normal"
                    style={{ color: "#938F96" }}
                  >
                    Baseline Fuel Rate{" "}
                  </p>
                </div>
              </div>
              {/* charts */}
              <div class={`  ${size.width<=768?"w-full":"w-[75%]"}  flex flex-col  h-[300px]    items-start   p-[12px] gap-[28px] flex-shrink-0 rounded-[12px] `}>
                
                <div id="chart" className="h-[100%] w-full">
                <Linechart  chart={fuelchart}/>
                </div>
              </div>
            </div>
        
      )}
    </div>
  );
}

export default Overviewfuelrate;
