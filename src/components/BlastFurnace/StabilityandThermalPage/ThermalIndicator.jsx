import React, { useEffect, useState } from "react";
import ThermalIndThermo from "../BF_Components/ThermalIndThermo";
import Thermalareachart from "../BF_Components/Thermalareachart";
import Thermalheatmap from "../BF_Components/Thermalheatmap";
import Mymodal from "../BF_Components/Mymodal";

function ThermalIndicator({ isExpanded3, handleToggle3 ,fetcheddata,client}) {
 

const [stateTempData,setStavetempData]=useState(fetcheddata.target_ranges_for_stave_temp.reverse());
const [heapMapData,setHeatMapData]=useState(fetcheddata.thermal_heat_map.reverse());
const [thermometerData,SetThermometerData]=useState(fetcheddata.thermal_indicator_chart[0]);
  console.log(heapMapData);
 
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
        <div class="flex w-[100px] justify-between fill-white drop-shadow-md  ">
          <div className="flex justify-center items-center  w-[50px]">
            <Mymodal imageone={"/Bficons/HeatmapIndTop.svg"} imageTwo={""} />
          </div>
          <div>
            <img
              src="/dropicon.svg"
              alt=""
              onClick={handleToggle3}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      {/* bottom */}
      {isExpanded3 && (
        <div className={`flex  gap-[18px]  h-full w-full  overflow-x-auto overflow-y-hidden`}>
          <div className={`flex gap-[10px]  h-full  w-[1200px]  `}>
            {/* thermal color indicator*/}
            <div class="flex flex-col w-[250px] h-full p-4  gap-3 items-center  bg-white   rounded-xl shadow-md ">
              <div className="flex w-full gap-2 justify-center items-center">
                <p class="text-[18px] text-left  w-full font-semibold text-[#3E3C42]">
                  Thermal Indicator
                </p>
                <Mymodal
                  imageone={"/Bficons/ThermometerindicatorTop.svg"}
                  imageTwo={""}
                />
              </div>
              <p class="text-[12px] text-left w-full  font-normal text-[#AEA9B1]">
                Last 1 Hour
              </p>
              <div className="w-[200px] h-full">
                <ThermalIndThermo maxTemperature={thermometerData.max_temperature} temperature={thermometerData.temperature} />
              </div>
            </div>

            {/* Target Ranges for Stave Temperature */}

            <div class="w-[400px] h-[400px]     p-0 ">
              {/* top */}
              <div class="w-full">
                <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
                  <div className="flex items-center gap-[8px]">
                    {" "}
                    <div class="flex gap-2 items-center font-roboto text-[22px] text-[#605D64] font-medium">
                      <p className="!text-base  sm:!text-base md:!text-base lg:!text-[22px] ">
                        Target Ranges for Stave Temperature
                      </p>
                      <Mymodal
                        imageone={"/Bficons/StavetempTop.svg"}
                        imageTwo={""}
                      />
                    </div>
                    <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
                  </div>
                  <div className={`flex items-start gap-[2%] w-[80%]  `}>
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
              <div class="w-full h-full">
                <Thermalareachart  fetcheddata={stateTempData}/>
              </div>
            </div>

            {/* Range bar */}
            <div class="w-[280px] flex h-[420px]   ">
              <div class="w-[350px] h-[100%] mt-[27px] ml-[-55px]">
                <Thermalheatmap  
                // fetcheddata={fetcheddata.target_ranges_for_stave_temp}
                />
              </div>
            </div>

         
              <img src="/Bficons/heatmaplegends.svg" alt="heat map legends" width="200px"  style={{ height:"300px", }} />
        
             
          </div>
        </div>
      )}
    </div>
  );
}

export default ThermalIndicator;
