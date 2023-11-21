import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Feed from "./Tabs/Feed";
import FeedLibrary from "./Tabs/FeedLibrary";
import Alerts from "./Tabs/Alerts";
import Report from "./Tabs/Report";
import Analytics from "./Tabs/Analytics";
import { useWindowSize } from "@uidotdev/usehooks";

const Capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

export const indexWordMap = {
  0: "No Flame",
  1: "Poor",
  2: "Average",
  3: "Good",
  4: "Better",
  5: "Excellent",
};

const Sinterflame = () => {
  const size = useWindowSize();
  const location = useLocation();
  const [plantCamMap, setPlantCamMap] = useState({});
  const [page, setPage] = useState("feed");
  const param = useParams();
  return (
    <div
      className="pl-5 pr-5  font-poppins flex flex-col rounded-lg"
      style={{ width: size.width >= 768 ? "calc(100vw - 168px)" : "100vw" }}
    >
      <div
        className="fixed top-5 right-0 h-[30px] w-[180px] bg-white"
        style={{ zIndex: 1000 }}
      >
        <img
          className="absolute h-[50px] w-[120px] top-[-20px] right-2"
          src="/clientLogos/hzl.png"
        />
      </div>
      <div className="flex justify-between mb-3 mt-6">
        <p className="text-lg sm:text-2xl font-semibold text-[#024D87]">
          {Capitalize("Sinter Flame Monitoring")}
        </p>
      </div>

      <Tabs>
        <TabList className="!flex !border-0">
          <div className="flex items-center gap-4 overflow-x-auto h-14 md:h-10">
            <Tab
              className={
                page === "feed"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("feed")}
            >
              Feed
            </Tab>
            <Tab
              className={
                page === "alerts"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("alerts")}
            >
              Alerts
            </Tab>
            <Tab
              className={
                page === "feed library"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("feed library")}
            >
              Feed Library
            </Tab>
            <Tab
              className={
                page === "analytics"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("analytics")}
            >
              Analytics
            </Tab>
            <Tab
              className={
                page === "report"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("report")}
            >
              Report
            </Tab>
          </div>
        </TabList>

        <TabPanels>
          <TabPanel className="!pl-0 !pr-0">
            <Feed
              material={"sinterflame"}
              clientId={param.clientId.toLowerCase()}
              setPlantCamMap={setPlantCamMap}
            />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <Alerts
              plantId="All Plants"
              cameraId=""
              disable={false}
              plantCamMap={plantCamMap}
            />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <FeedLibrary
              plantId="All Plants"
              cameraId=""
              disable={false}
              plantCamMap={plantCamMap}
            />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            {Object.keys(plantCamMap).length != 0 && (
              <Analytics
                plantId={Object.keys(plantCamMap)[0]}
                cameraId={plantCamMap[Object.keys(plantCamMap)[0]][0]}
                disable={false}
                plantCamMap={plantCamMap}
              />
            )}
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <Report
              plantId="All Plants"
              cameraId=""
              disable={false}
              plantCamMap={plantCamMap}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Sinterflame;
