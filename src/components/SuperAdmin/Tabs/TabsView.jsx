import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";

const AdminTabs = ({ update, clientOrg }) => {
  const size = useWindowSize();
  let param = useParams();

  console.log("update", update);
  return (
    <div className="flex gap-5">
      <div className="flex justify-center items-center border rounded-full px-7 text-[#605D64] text-sm bg-[#DDEEFF]">
        {update === "update" ? "Edit" : "Summary"}
      </div>

      <Link to="/superadmin/subscriptions">
        <div className="flex border rounded-full px-7 py-3 justify-center items-center !text-[#605D64] text-sm">
          Subscriptions
        </div>
      </Link>
      <Link
        to={
          update === "update"
            ? `/superadmin/usermanagement/update/${clientOrg}`
            : `/superadmin/usermanagement/${clientOrg}`
        }
      >
        <div className="w-[160px] flex border rounded-full py-3 justify-center items-center !text-[#605D64] text-sm">
          User Management
        </div>
      </Link>
      {update == "update" ? (
        ""
      ) : (
        <Link to={`/superadmin/sessionlogs/${clientOrg}`}>
          <div className="w-[160px] flex border rounded-full  py-3 justify-center items-center !text-[#605D64] text-sm">
            Session Logs
          </div>
        </Link>
      )}
      {update == "update" ? (
        ""
      ) : (
        <Link to={`/superadmin/token/transactions/${clientOrg}`}>
          <div className="w-[160px] flex border rounded-full py-3 justify-center items-center !text-[#605D64] text-sm">
            Token Transactions
          </div>
        </Link>
      )}
      <Link to={`/superadmin/allottokens/${clientOrg}`}>
        <div className="w-[160px] flex border rounded-full py-3 justify-center items-center !text-[#605D64] text-sm">
          Allocated Tokens
        </div>
      </Link>
    </div>
  );
};

export default AdminTabs;
