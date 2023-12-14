import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";

import ViewClient from "../AddClients/ViewClient";
import AllotToken from "../../Admin/Tabs/AllotToken";
import TokenTransaction from "../../Admin/Tabs/TokenTransaction";
import SessionLogs from "../../Admin/Tabs/SessionLogs";
import UserMgmt from "../../Admin/Tabs/UserMgmt";
import ActiveSubs from "../../Admin/Tabs/ActiveSubs";

const Capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

const ViewTabs = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  const size = useWindowSize();
  let param = useParams();
  const [plantCamMap, setPlantCamMap] = useState({});
  const [page, setPage] = useState("summary");
  const handleBackButton = () => {
    navigate("/superadmin/addclient");
  };
  return (
    <div
      className="pl-0 pr-5  font-roboto flex flex-col rounded-lg"
      //   style={{ width: size.width >= 768 ? "calc(100vw - 168px)" : "100vw" }}
    >
      <div className="flex items-between mb-3 mt-6">
        <div className="cursor-pointer w-8" onClick={handleBackButton}>
          <img
            src="/transactionhistory/backarrow.svg"
            className="w-full h-full"
            alt="backarrow_img"
          />
        </div>
        <p className="text-lg sm:text-2xl font-semibold text-[#024D87]">
          View Details
        </p>
      </div>

      <Tabs className="bg-white rounded-md px-6 border-2 pt-4">
        <TabList className="!flex !border-0">
          <div className="flex items-center gap-4 overflow-x-auto h-14 md:h-10">
            <Tab
              className={
                page === "summary"
                  ? "!text-[#605D64] !text-xs sm:!text-sm !bg-[#6CABFC] !bg-opacity-20 rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#6CA6FC]"
                  : "!text-xs sm:!text-sm !text-[#605D64] !border !border-[#EBEBEB] !rounded-full"
              }
              onClick={() => setPage("summary")}
            >
              Summary
            </Tab>
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
              Token Transactions
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
            {clientId && <ViewClient />}
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            {clientId && <ActiveSubs clientId={clientId} mode="view" />}
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            {clientId && <UserMgmt clientId={clientId} />}
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            {clientId && <SessionLogs clientId={clientId} />}
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            {clientId && <TokenTransaction clientId={clientId} />}
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            {clientId && <AllotToken clientId={clientId} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ViewTabs;
