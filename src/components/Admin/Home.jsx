import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import SessionLogs from "./Tabs/SessionLogs";
import UserMgmt from "./Tabs/UserMgmt";
import ActiveSubs from "./Tabs/ActiveSubs";
import TokenTransaction from "./Tabs/TokenTransaction";
import AllotToken from "./Tabs/AllotToken";

const Capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

const AdminHome = () => {
  const size = useWindowSize();
  let param = useParams();
  const [plantCamMap, setPlantCamMap] = useState({});
  const [page, setPage] = useState("activesubs");
  const [isFetchTranChanged, setTranTableChange] = useState(false);

  return (
    <div
      className="pl-0 pr-5  font-roboto flex flex-col rounded-lg"
      style={{ width: size.width >= 768 ? "calc(100vw - 168px)" : "100vw" }}
    >
      <div className="flex justify-between mb-3 mt-6">
        <p className="text-lg sm:text-2xl font-semibold text-[#024D87]">
          {Capitalize("Admin Panel")}
        </p>
      </div>

      <Tabs className="bg-white rounded-md px-3 border-2 py-4">
        <TabList className="!flex !border-0">
          <div className="flex items-center gap-4 overflow-x-auto h-14 md:h-10">
            <Tab
              className={
                page === "activesubs"
                  ? "!text-[#605D64] !text-xs sm:!text-sm !bg-[#6CABFC] !bg-opacity-20 rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#6CA6FC]"
                  : "!text-xs sm:!text-sm !text-[#605D64] !border !border-[#EBEBEB] !rounded-full"
              }
              onClick={() => setPage("activesubs")}
            >
              Subscriptions
            </Tab>
            <Tab
              className={
                page === "user_management"
                  ? "!text-[#605D64] !text-xs sm:!text-sm !bg-[#6CABFC] !bg-opacity-20 rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#6CA6FC]"
                  : "!text-xs sm:!text-sm !text-[#605D64] !border !border-[#EBEBEB] !rounded-full"
              }
              onClick={() => setPage("user_management")}
            >
              User Management
            </Tab>
            <Tab
              className={
                page === "session_logs"
                  ? "!text-[#605D64] !text-xs sm:!text-sm !bg-[#6CABFC] !bg-opacity-20 rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#6CA6FC]"
                  : "!text-xs sm:!text-sm !text-[#605D64] !border !border-[#EBEBEB] !rounded-full"
              }
              onClick={() => setPage("session_logs")}
            >
              Session Logs
            </Tab>
            <Tab
              className={
                page === "token_transactions"
                  ? "!text-[#605D64] !text-xs sm:!text-sm !bg-[#6CABFC] !bg-opacity-20 rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#6CA6FC]"
                  : "!text-xs sm:!text-sm !text-[#605D64] !border !border-[#EBEBEB] !rounded-full"
              }
              onClick={() => setPage("token_transactions")}
            >
              Allocation History
            </Tab>
            <Tab
              className={
                page === "allot_token"
                  ? "!text-[#605D64] !text-xs sm:!text-sm !bg-[#6CABFC] !bg-opacity-20 rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#6CA6FC]"
                  : "!text-xs sm:!text-sm !text-[#605D64] !border !border-[#EBEBEB] !rounded-full"
              }
              onClick={() => setPage("allot_token")}
            >
              Allocate Tokens
            </Tab>
          </div>
        </TabList>

        <TabPanels className="!pt-4">
          <TabPanel className="!pl-0 !pr-0">
            <ActiveSubs />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <UserMgmt />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <SessionLogs />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <TokenTransaction isFetchTranChanged={isFetchTranChanged} />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <AllotToken
              setTranTableChange={setTranTableChange}
              isFetchTranChanged={isFetchTranChanged}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AdminHome;
