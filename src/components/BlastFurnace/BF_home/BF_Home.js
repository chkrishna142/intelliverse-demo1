import { Tabs, TabList, TabPanels, Tab, TabPanel, div } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import Fuelrate from "./Fuelrate";
import Production from "./Production";

const BF_Home = () => {

  return (
    <div className="w-full h-full flex flex-col   ">
      <div class="w-full h-full ">
        <p
          style={{
            color: "#024D87",
            

            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",

            height: "auto",

            //

            whiteSpace: "nowrap",
          }}
          class="text-left text-base md:text-base lg:text-base xl:text-xl"
          // className="text-blue-600 font-roboto text-2xl font-semibold w-[308] h-[26] ml-[24] mt-[27] whitespace-nowrap"
        >
          AI Alerts and Recommendations
        </p>
        <div
          style={{}}
          //  className="grid grid-cols-1 h-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[4px] sm:gap-[5px] md:gap-[6px] lg:gap-[7px] xl:gap-[8px] w-full  justify-items-center"
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-[33px] sm:gap-[44px]   w-full h-auto justify-center "
        >
          <Fuelrate />
         
          <Production />
        </div>
        <div className="flex w-full justify-end  h-[20%] ">
          {/* <Modelaccuracy /> */}
        </div>
      </div>
    </div>
  );
};

export default BF_Home;
