import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Alerts from "./Tabs/Alerts";
import FeedLibrary from "./Tabs/FeedLibrary";
import Report from "./Tabs/Report";
import CamFeed from "./Tabs/CamFeed";
import Analytics from "./Tabs/Analytics";
import Timer from "../../util/VisionUtils/Timer";
import { useWindowSize } from "@uidotdev/usehooks";

const Capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

const SinterflameSingle = () => {
  const size = useWindowSize();
  const param = useParams();
  const [page, setPage] = useState("feed");
  const [callApi, setCallApi] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  let material = 'sinterflame';
  let cameraId = param.cameraId;
  let clientId = param.clientId;
  let plantId = param.plantId;
  return (
    <div
      className="pl-5 pr-5 flex flex-col rounded-lg"
      style={{ width: size.width >= 768 ? "calc(100vw - 168px)" : "100vw" }}
    >
      <div className="flex justify-between mb-3 mt-6 items-center">
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="#024D87" />}
        >
          <BreadcrumbItem>
            <Link
              to={`/vision/processMonitoring/${material}/${clientId}`}
              style={{ textDecoration: "none" }}
            >
              <p className="text-lg sm:text-2xl font-semibold text-[#024D87]">
                {Capitalize("Sinter Flame Monitoring")}
              </p>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-lg sm:text-2xl font-semibold text-[#024D87]">
              {Capitalize(param.cameraId)}
            </p>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Tabs>
        <div className="flex justify-between items-center overflow-x-auto h-14 md:h-10">
          <TabList className="!flex !border-0">
            <div className="flex items-center gap-4">
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
          {
            <div className={`${page === "feed" ? "opacity-100" : "opacity-0"}`}>
              <Timer
                initialSeconds={30}
                callFunc={setCallApi}
                initialRender={initialRender}
                setInitialRender={setInitialRender}
              />
            </div>
          }
        </div>

        <TabPanels>
          <TabPanel className="!pl-0 !pr-0 ">
            <CamFeed
              material={material}
              cameraId={cameraId}
              clientId={clientId}
              callApi={callApi}
              initialRender={initialRender}
            />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <Alerts plantId={plantId} cameraId={cameraId} disable={true} />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <FeedLibrary plantId={plantId} cameraId={cameraId} disable={true} />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <Analytics plantId={plantId} cameraId={cameraId} disable={true} />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <Report plantId={plantId} cameraId={cameraId} disable={true} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default SinterflameSingle;