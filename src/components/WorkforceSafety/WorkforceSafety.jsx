import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import Feed from "./Tabs/Feed";
import Alerts from "./Tabs/Alerts";
import Report from "./Tabs/Report";
import { useWindowSize } from "@uidotdev/usehooks";

const Capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

const WorkforceSafety = () => {
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
      <div className="fixed top-5 right-0 h-[30px] w-[180px] bg-white" style={{ zIndex: 1000 }}>
        <img
          className="absolute h-[200px] w-[180px] top-[-85px]"
          src="https://static.vecteezy.com/system/resources/previews/021/671/856/original/asian-paints-logo-free-png.png"
        />
      </div>
      <div className="flex justify-start gap-2 items-center mb-3 mt-6">
      <Link
          to={`/vision/workforceMonitoring/${param.material}`}
          style={{
            textDecoration: "none",
          }}
        >
          <img src="/backtick.svg" />
        </Link>
        <p className="text-lg sm:text-2xl font-semibold text-[#024D87]">
          {Capitalize("raw material sampling")}
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
              material={param.material.toLowerCase()}
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

export default WorkforceSafety;
