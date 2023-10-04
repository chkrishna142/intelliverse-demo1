import { useEffect, useState } from "react";
import Fuelrate from "./Fuelrate";
import Production from "./Production";
import Modelaccuracy from "../BF_Components/Modelaccuracy";
import Averagepar from "./Averagepar";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useWindowSize } from "@uidotdev/usehooks";
import BFHomeComponent from "../BF_Components/BFHomeComponent";
import Serverdown from "../BF_Components/Serverdown";
import Timer from "../../../util/VisionUtils/Timer";

const BF_Home = ({
  fetcheddata,
  client,
  pageshift,
  handleTabChange,
  workingurl,
  setInitialRender,
  initialRender,
  callFunc
}) => {
  const size = useWindowSize();

  const silicon_table_data = [
    {
      name: "RAFT",
      current: 1200,
      optimal_range: [1200, 1300],
      impact: "-",
    },
    {
      name: "PCI",
      current: 155,
      optimal_range: [150, 170],
      impact: "-",
    },
    {
      name: "Actual Si Value",
      current: 0.45,
      optimal_range: [0.4, 0.47],
      impact: "-",
    },
    // {
    //   name: "Top Drivers",
    //   current: 1400,
    //   optimal_range: [1410,1500],
    //   impact: "2",
    // },
  ];

  if (fetcheddata) {
    return (
      <div className="w-full h-full flex flex-col  ">
        <div class="w-full h-full ">
          <div
            className={`w-full h-full flex ${
              size.width < 768 ? "flex-col gap-4" : ""
            } justify-between`}
          >
            <p
              style={{
                color: "#024D87",
                fontWeight: "600",
                height: "auto",
                whiteSpace: "nowrap",
                fontSize: "20px",
              }}
            >
              AI Alerts and Recommendations
            </p>
            {
              <div className="w-full h-full flex justify-end">
                <Timer
                  initialSeconds={30}
                  callFunc={callFunc}
                  initialRender={initialRender}
                  setInitialRender={setInitialRender}
                />
              </div>
            }
          </div>
          {/* className={`${page==="feed" ? "opacity-100" : "opacity-0"}`} */}
          <div
            style={{}}
            //  className="grid grid-cols-1 h-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[4px] sm:gap-[5px] md:gap-[6px] lg:gap-[7px] xl:gap-[8px] w-full  justify-items-center"
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 justify-center mb-[10px] w-full p-2 "
          >
            <Fuelrate
              data={fetcheddata?.tools.fuel_rate}
              pageshift={pageshift}
              handleTabChange={handleTabChange}
            />

            <Production
              data={fetcheddata?.tools.burden_production}
              pageshift={pageshift}
              handleTabChange={handleTabChange}
            />

            {/* {
                client!="sesa"? <Averagepar pageshift={pageshift} handleTabChange={handleTabChange}/>:""
              } */}
            <Averagepar
              pageshift={pageshift}
              handleTabChange={handleTabChange}
            />
            {/* <BFHomeComponent data={fetcheddata?.tools.fuel_rate} tableData={silicon_table_data} toolname={"Silicon Prediction"} pageshift={pageshift} handleTabChange={handleTabChange}/> */}
          </div>
          <div className="flex w-full justify-end  h-[20%]">
            {/* <Modelaccuracy /> */}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" flex justify-center">
        <CircularProgress isIndeterminate color="green.300" />
        {/* return '<div class="relative bg-white border border-gray-300 p-4 shadow-md rounded-md flex flex-col gap-[30px] h-[180px] w-[100px]" >' +
          '<p class="absolute bottom-[30%] left-[-40px] font-bold mb-1 rotate-[-90deg]"> ' + data1.x +':'+ '</p>' +  */}
      </div>
    );
  }
};

export default BF_Home;
