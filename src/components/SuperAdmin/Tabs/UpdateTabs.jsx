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
import UpdateClient from "../AddClients/UpdateClient";
import DevelopmentInProgress from "../Deploy/DevelopmentInProgress";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";

const UpdateTabs = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const [isDeployClicked, setDeployClicked] = useState(false);

  const size = useWindowSize();
  let param = useParams();
  const [plantCamMap, setPlantCamMap] = useState({});
  const [page, setPage] = useState("edit");
  const handleBackButton = () => {
    navigate("/superadmin/addclient");
  };
  return (
    <> {!isDeployClicked ? <div
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
          Update Client Details
        </p>
      </div>

      <Tabs className="bg-white rounded-md px-6 border-2 pt-4">
        <TabList className="!flex !border-0 !justify-between !items-center" width={'full'}>
          <div className="flex items-center gap-4 overflow-x-auto h-14 md:h-10">
            <Tab
              className={
                page === "edit"
                  ? "!text-[#605D64] !text-xs sm:!text-sm !bg-[#6CABFC] !bg-opacity-20 rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#6CA6FC]"
                  : "!text-xs sm:!text-sm !text-[#605D64] !border !border-[#EBEBEB] !rounded-full"
              }
              onClick={() => setPage("edit")}
            >
              Edit
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
                page === "allot_token"
                  ? "!text-[#605D64] !text-xs sm:!text-sm !bg-[#6CABFC] !bg-opacity-20 rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#6CA6FC]"
                  : "!text-xs sm:!text-sm !text-[#605D64] !border !border-[#EBEBEB] !rounded-full"
              }
              onClick={() => setPage("allot_token")}
            >
              Allocate Tokens
            </Tab>
          </div>
          <PrimaryButton text={"Deploy"} width={"fit-content"} onClick={()=>setDeployClicked(true)} />

        </TabList>

        <TabPanels className="!pt-4">
          <TabPanel className="!pl-0 !pr-0">
            {clientId && <UpdateClient setDeployClicked={setDeployClicked} />}
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            {clientId && <ActiveSubs clientId={clientId} mode="view" />}
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            {clientId && <UserMgmt clientId={clientId} />}
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            {clientId && <AllotToken clientId={clientId} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>:<DevelopmentInProgress />}</>
  );
};

export default UpdateTabs;
