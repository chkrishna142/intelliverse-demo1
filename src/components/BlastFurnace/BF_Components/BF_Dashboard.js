import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import BF_Home from "../BF_home/BF_Home";
import StabilityandThermal from "../StabilityandThermalPage/StabilityandThermal";

const BF_Dashboard = () => {

  const Capitalize = (str) =>{
    const arr = str.split(" ")
  for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2
  }
  
  const [page, setPage] = useState("dashboard");

  return (
    
    <div className=" mt-[20px]">
     
     <div className=" h-[50px]">
        <p className="text-3xl sm:text-4xl font-semibold text-[#024D87] ">
        {Capitalize(page)}
        </p>
        </div> 

      <div className="  pl-3 pr-3 sm:pl-5 sm:pr-2 flex flex-col rounded-lg ">
        <Tabs>
          <TabList className="!flex !border-0">
            <div className="flex items-center gap-4">
              <Tab
                className={
                  page === "dashboard"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
                }
                onClick={() => setPage("dashboard")}
              >
                DASHBOARD
              </Tab>
              <Tab
                className={
                  page === "fuel optimizer"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
                }
                onClick={() => setPage("fuel optimizer")}
              >
                Fuel Optimizer
              </Tab>
              <Tab
                className={
                  page === "Stability & Thermal Performance"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
                }
                onClick={() => setPage("Stability & Thermal Performance")}
              >
                Stability & Thermal Performance
              </Tab>
            </div>
          </TabList>


          <TabPanels >
            <TabPanel className="!pl-0 !pr-0">
              <BF_Home />
            </TabPanel>
            <TabPanel className="!pl-0 !pr-0">
              <p>Hello</p>
            </TabPanel>
            <TabPanel className="!pl-0 !pr-0">
              <StabilityandThermal/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default BF_Dashboard;
