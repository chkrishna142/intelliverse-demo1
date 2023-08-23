import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import BF_Home from "../BF_home/BF_Home";
import StabilityandThermal from "../StabilityandThermalPage/StabilityandThermal";

const BF_Dashboard = () => {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="w-full  mt-[20px] pl-5 pr-5 font-poppins flex flex-col rounded-lg">
      <h1 className="text-3xl sm:text-4xl font-semibold text-[#024D87]">
        BLAST FURNACE
      </h1>

      <div className=" mt-[20px] pl-3 pr-3 sm:pl-5 sm:pr-5 font-poppins flex flex-col rounded-lg">
        <Tabs>
          <TabList className="!flex !border-0">
            <div className="flex items-center gap-4">
              <Tab
                className={
                  page === "dashboard"
                    ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                    : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
                }
                onClick={() => setPage("dashboard")}
              >
                DASHBOARD
              </Tab>
              <Tab
                className={
                  page === "furloptimizer"
                    ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                    : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
                }
                onClick={() => setPage("furloptimizer")}
              >
                Fuel Optimizer
              </Tab>
              <Tab
                className={
                  page === "Stability&ThermalPerformance"
                    ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                    : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
                }
                onClick={() => setPage("Stability&ThermalPerformance")}
              >
                Stability & Thermal Performance
              </Tab>
            </div>
          </TabList>


          <TabPanels className="h-[80vh] ">
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
