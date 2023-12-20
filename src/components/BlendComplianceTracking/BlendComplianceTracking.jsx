import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import Feed from "./Tabs/Feed";
import Alerts from "./Tabs/Alerts";
import Status from "./Tabs/Status";
import Report from "./Tabs/Report";
import FeedLibrary from "./Tabs/FeedLibrary";
import { useWindowSize } from "@uidotdev/usehooks";

const BlendComplianceTracking = () => {
  const size = useWindowSize();
  const [page, setPage] = useState("status");
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
          className="absolute h-[60px] w-auto top-[-25px] right-5"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Hindalco_Logo.svg/640px-Hindalco_Logo.svg.png"
        />
      </div>
      <div className="flex justify-start items-center gap-2 mb-3 mt-6">
        <Link
          to={`/vision/workforceMonitoring/blendcompliance`}
          style={{
            textDecoration: "none",
          }}
        >
          <img src="/backtick.svg" />
        </Link>
        <p className="text-lg sm:text-2xl font-semibold text-[#024D87] capitalize">
          {"Blend Compliance Tracking"}
        </p>
      </div>

      <Tabs>
        <TabList className="!flex !border-0">
          <div className="flex items-center gap-4 overflow-x-auto h-14 md:h-10">
            <Tab
              className={
                page === "status"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("status")}
            >
              Status
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
                page === "report"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("report")}
            >
              Report
            </Tab>
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
          </div>
        </TabList>

        <TabPanels>
          <TabPanel className="!pl-0 !pr-0">
            <Status />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <Alerts
              plantId="All Plants"
              cameraId=""
              disable={false}
              //   plantCamMap={plantCamMap}
            />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <Report
              plantId="All Plants"
              cameraId=""
              disable={false}
              // plantCamMap={plantCamMap}
            />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            {/* <Feed /> */}
            <FeedLibrary />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default BlendComplianceTracking;
