import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import Feed from "./Tabs/Feed";
import FeedLibrary from "./Tabs/FeedLibrary";
import Alerts from "./Tabs/Alerts";

const Sizing = () => {
  const [page, setPage] = useState("feed");

  return (
    <div className="mt-[20px] pl-5 pr-5 font-poppins flex flex-col rounded-lg">
      <div className="flex justify-between mb-3">
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#024D87]">
          {page.toUpperCase()}
        </h1>
      </div>
      <Tabs>
        <TabList className="!flex !border-0">
          <div className="flex items-center gap-4">
            <Tab
              className={
                page === "feed"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("feed")}
            >
              Feed
            </Tab>
            <Tab
              className={
                page === "alerts"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("alerts")}
            >
              Alerts
            </Tab>
            <Tab
              className={
                page === "feed library"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("feed library")}
            >
              Feed Library
            </Tab>
            <Tab
              className={
                page === "analytics"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("analytics")}
            >
              Analytics
            </Tab>
            <Tab
              className={
                page === "report"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
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
            <Feed />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <Alerts/>
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <FeedLibrary/>
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <p>Hello</p>
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <p>Hello</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Sizing;
