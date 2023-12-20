import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Feed from "./tabs/Feed";
import Alert from "./tabs/Alert";
import Report from "./tabs/Report";

const Capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

const SlabSizing = () => {
  let param = useParams();
  const size = useWindowSize();
  const [page, setPage] = useState("feed");

  //   const { auth, email } = useContext(NavContext);

  //   const apiCall = async () => {
  //     const requestData = JSON.stringify({
  //       email: email,
  //       category: param.category.toLowerCase(),
  //     });
  //     const response = await axios
  //       .post(baseURL + "vision/v2/product/overview/", requestData, {
  //         credentials: "same-origin",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Auth-Token": auth,
  //         },
  //       })
  //       .then((response) => {
  //         setMaterialData(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  return (
    <div
      className="pl-5 pr-5  font-poppins flex flex-col rounded-lg bg-red"
      style={{ width: size.width >= 768 ? "calc(100vw - 168px)" : "100vw" }}
    >
      <div className="flex justify-start gap-2 items-center mb-3 mt-6">
        <Link
          to={`/vision/qualityTracking/steelslab`}
          style={{
            textDecoration: "none",
          }}
        >
          <img src="/backtick.svg" />
        </Link>
        <p className="text-lg sm:text-2xl font-semibold text-[#024D87]">
          {Capitalize("Slab Sizing")}
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
            <Feed />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <Alert />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <Report />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default SlabSizing;
