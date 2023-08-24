import { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Modelaccuracy from "../BF_Components/Modelaccuracy";
import StabilityInd from "./StabilityInd";
import Rca from "./Rca";
import ThermalIndicator from "./ThermalIndicator";
import Recommendations from "./Recommendations";

const StabilityandThermal = () => {

  const [isExpanded1, setIsExpanded1] = useState(true);
  const handleToggle1 = () => {
    setIsExpanded1((prevExpanded) => !prevExpanded);
  };
  const [isExpanded2, setIsExpanded2] = useState(true);
  const handleToggle2 = () => {
    setIsExpanded2((prevExpanded) => !prevExpanded);
  };
  const [isExpanded3, setIsExpanded3] = useState(true);
  const handleToggle3 = () => {
    setIsExpanded3((prevExpanded) => !prevExpanded);
  };
  const [isExpanded4, setIsExpanded4] = useState(true);
  const handleToggle4 = () => {
    setIsExpanded4((prevExpanded) => !prevExpanded);
  };


  const [page, setPage] = useState("StabilityIndicator");



  return (
    <div className="w-full h-full  flex flex-col     ">
      <Tabs>
        <TabList className="!flex !border-0">
          <div className="flex items-center gap-4">
            <Tab
              className={
                page === "StabilityIndicator"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("StabilityIndicator")}
            >
              Stability Indicator
            </Tab>
            <Tab
              className={
                page === "RCA"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("RCA")}
            >
              RCA
            </Tab>
            <Tab
              className={
                page === "ThermalIndicator"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("ThermalIndicator")}
            >
              Thermal Indicator
            </Tab>
            
            <Tab
              className={
                page === "Recommendations"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("Recommendations")}
            >
              Recommendations
            </Tab>
          </div>
        </TabList>

        <TabPanels className="h-[65vh] ">
          <TabPanel className="!pl-0 !pr-0">
          <StabilityInd isExpanded1={isExpanded1} handleToggle1={handleToggle1}/> 
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <Rca isExpanded2={isExpanded2} handleToggle2={handleToggle2}/>
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
          <ThermalIndicator isExpanded3={isExpanded3} handleToggle3={handleToggle3}/>
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
          <Recommendations isExpanded4={isExpanded4} handleToggle4={handleToggle4}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div class="flex justify-end ">
          <Modelaccuracy />
        </div> 

     
    </div>
  );
};

export default StabilityandThermal;
