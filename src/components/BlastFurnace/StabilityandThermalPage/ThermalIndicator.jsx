import React, { useEffect, useState } from "react";
import ThermalIndThermo from "../BF_Components/ThermalIndThermo";
import Thermalareachart from "../BF_Components/Thermalareachart";
import Thermalheatmap from "../BF_Components/Thermalheatmap";
import Mymodal from "../BF_Components/Mymodal";
import CustomHeatmap from "../../Charts/BF_Charts/CustomHeatmap";

function ThermalIndicator({ isExpanded3, handleToggle3 ,fetcheddata,client}) {
 
  const thermometerData=fetcheddata.thermal_indicator_chart[0];
  
  return (
    <div className="flex flex-col  h-full bg-white p-4 rounded-xl  shadow-md  ">
      {/* top */}
      <div class="flex justify-between w-full ">
        <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
          <div className="flex items-center gap-[8px]">
            {" "}
            <div class="flex gap-2 font-roboto text-[22px] text-[#3E3C42] font-medium">
              <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
                Thermal Indicator
              </p>
              <Mymodal
                  imageone={"/Bficons/ThermometerindicatorTop.svg"}
                  imageTwo={""}
                />
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
          <div className={`flex-1 flex gap-[10px]  h-full  min-w-[1200px]  `}>
            {/* thermal color indicator*/}

            <div class="flex-1 flex min-w-[250px] h-full p-2  gap-3 items-center  bg-white   rounded-xl shadow-md  b">
              
              <div className="flex bg-white p-3 rounded-xl text-center whitespace-nowrap items-center font-semibold text-xl ">

                  {(parseInt(thermometerData.temperature) > 0 ? '+' : '') +  parseInt(thermometerData.temperature)}
                  {" Point" 
                  + ((parseInt(thermometerData.temperature) > 1 
                   || parseInt(thermometerData.temperature) < -1) ? 's' : '')}
                </div>

              <div className=" min-w-[120px] h-full ">

                <ThermalIndThermo maxTemperature={parseInt(thermometerData.max_temperature)} temperature={parseInt(thermometerData.temperature)} />
                
              </div>
            </div>

            {/* Target Ranges for Stave Temperature */}

            <div class="flex-1 min-w-[400px] h-[400px]     p-0 ">
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
                <Thermalareachart  data={fetcheddata}/>
              </div>
            </div>

            {/* Range bar */}
            <div class="flex-1 min-w-[280px] flex h-[420px]   ">
              <div class="min-w-[280px] h-[100%] mt-[56px]">
                {/* <Thermalheatmap  
                fetcheddata={heapMapData}
                /> */}
                <CustomHeatmap data={fetcheddata}/>
              </div>
            </div>

         <div className=" min-w-[200px] flex-1 self-center">
            <img src="/Bficons/heatmaplegends.svg" alt="heat map legends"   />
            </div>
             
          </div>
        </div>
      )}
    </div>
  );
}

export default ThermalIndicator;
