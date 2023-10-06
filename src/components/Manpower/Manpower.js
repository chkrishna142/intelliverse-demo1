import { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Weekly from "./Tabs/weekly";
import ManpowerMngmt from "./Tabs/ManpowerMngmt";
import MasterFiles from "./Tabs/MasterFiles";
import { useWindowSize } from "@uidotdev/usehooks";

const Manpower = () => {
  const size = useWindowSize();
  const [page, setPage] = useState("weekly schedule");
  return (
    <div
      className="flex flex-col gap-0 w-full mt-8"
      style={{ width: size.width >= 768 ? "calc(100vw - 168px)" : "100vw" }}
    >
      <Tabs>
        <TabList className="!flex !gap-0 !w-full !border-0">
          <Tab className="!flex-1 !p-0 !border-0">
            <div
              className={`flex items-center justify-center w-full p-2 cursor-pointer ${
                page === "weekly schedule" && "bg-white rounded-tl-xl"
              }`}
              onClick={() => setPage("weekly schedule")}
            >
              <p
                className={
                  page === "weekly schedule"
                    ? "text-[#2660B6] text-base font-medium"
                    : "text-[#605D64] text-base"
                }
              >
                Weekly schedule
              </p>
            </div>
          </Tab>
          <Tab className="!flex-1 !p-0 !border-0">
            <div
              className={`flex items-center justify-center w-full p-2 cursor-pointer ${
                page === "manpower management" && "bg-white rounded-t-xl"
              }`}
              onClick={() => setPage("manpower management")}
            >
              <p
                className={
                  page === "manpower management"
                    ? "text-[#2660B6] text-base font-medium"
                    : "text-[#605D64] text-base"
                }
              >
                Manpower management
              </p>
            </div>
          </Tab>
          <Tab className="!flex-1 !p-0 !border-0">
            <div
              className={`flex items-center justify-center w-full p-2 cursor-pointer ${
                page === "master files" && "bg-white rounded-t-xl"
              }`}
              onClick={() => setPage("master files")}
            >
              <p
                className={
                  page === "master files"
                    ? "text-[#2660B6] text-base font-medium"
                    : "text-[#605D64] text-base"
                }
              >
                Master Files
              </p>
            </div>
          </Tab>
          <Tab className="!flex-1 !p-0 !border-0">
            <div
              className={`flex items-center justify-center w-full p-2 cursor-pointer ${
                page === "overview" && "bg-white rounded-tr-xl"
              }`}
              onClick={() => setPage("overview")}
            >
              <p
                className={
                  page === "overview"
                    ? "text-[#2660B6] text-base font-medium"
                    : "text-[#605D64] text-base"
                }
              >
                Overview
              </p>
            </div>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel className="!p-0">
            <Weekly />
          </TabPanel>
          <TabPanel className="!p-0">
            <ManpowerMngmt />
          </TabPanel>
          <TabPanel className="!p-0">
            <MasterFiles />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Manpower;
