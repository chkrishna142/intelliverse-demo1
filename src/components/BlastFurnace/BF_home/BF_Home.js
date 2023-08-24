import { Tabs, TabList, TabPanels, Tab, TabPanel, div } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import Fuelrate from "./Fuelrate";
import Production from "./Production";
import Modelaccuracy from "../BF_Components/Modelaccuracy";

const BF_Home = () => {
  return (
    <div className="w-full h-full flex flex-col  ">
      <div class="w-full h-full ">
        <p
          style={{
            color: "#024D87",
             fontWeight: "600",
             height: "auto",
            whiteSpace: "nowrap",
            fontSize:"20px"
          }}
         
        >
          AI Alerts and Recommendations
        </p>
        <div
          style={{}}
          //  className="grid grid-cols-1 h-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[4px] sm:gap-[5px] md:gap-[6px] lg:gap-[7px] xl:gap-[8px] w-full  justify-items-center"
          className="flex   w-full h-auto justify-evenly "
        >
          <Fuelrate />

          <Production />
        </div>
        <div className="flex w-full justify-end  h-[20%] ">
          <Modelaccuracy />
        </div>
      </div>
    </div>
  );
};

export default BF_Home;
