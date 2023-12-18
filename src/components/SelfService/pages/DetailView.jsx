import { useState, useContext, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import PredictionCard from "../Components/PredictionCard";
import OutputDetail from "../Components/OutputDetail";
import ViewForm from "./ViewForm";
import axios from "axios";
import { baseURL } from "../../..";
import NavContext from "../../NavContext";

const Capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
  }
  const str2 = arr.join(" ");
  return str2;
};

const DetailView = () => {
  const [page, setPage] = useState("Project details");
  const { projectId } = useParams();
  const param = {
    projectId: projectId,
  };
  const initState = {
    name: "",
    dataType: "",
    whatToDetect: "",
    uploadedFiles: {},
    savedFiles: null,
    isAnnotated: "No",
    annotationType: "",
    annotatedData: null,
    lastUpdatedAt: new Date().getTime(),
  };
  const { auth } = useContext(NavContext);
  const [userState, setUserState] = useState(initState);
  const [modelInfo, setModelInfo] = useState({
    status: "",
    performance: null,
  });
  let pollTimer;

  const getSingle = async () => {
    try {
      const resposne = await axios.get(
        baseURL + "selfserve/v1/project/v1/getSingle/",
        {
          params: param,
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );
      setUserState((prev) => {
        let newData = { ...prev };
        let data = resposne.data;
        let val = Object.keys(data?.detail[0]?.dataset)[0];
        newData["name"] = data?.name || "";
        newData["dataType"] =
          Capitalize(data?.detail[0]?.datasetType) || "Image";
        newData["whatToDetect"] = data?.remarks || "";
        newData["isAnnotated"] = data?.isAnnotated ? "Yes" : "No";
        newData["annotationType"] =
          Capitalize(data?.detail[0]?.modelType) || "Classify";
        newData["savedFiles"] = "Dummy";
        newData["uploadedFiles"] = data?.detail[0]?.dataset?.[val] || {};
        newData["annotatedData"] = data?.detail[0]?.annotations?.[val] || [];
        newData["lastUpdatedAt"] = data?.lastUpdatedAt;
        return newData;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getStatus = async () => {
    try {
      const response = await axios.get(
        baseURL + "selfserve/v1/project/v1/training/status/",
        {
          params: param,
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );
      if (response.status == 200 && response.data) {
        let { status, performance = null } = response.data[0];
        console.log(status,'status received')
        setModelInfo((prev) => ({
          ...prev,
          status: status,
          performance: performance,
        }));
        if (status == "COMPLETE" || status == 'FAILED') {
          clearInterval(pollTimer);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingle();
    pollTimer = setInterval(getStatus, 2000);
    return () => clearInterval(pollTimer);
  }, []);

  const tabs = [
    "Project details",
    "Model output overview",
    "Model output details",
  ];

  return (
    <div className="flex flex-col gap-2 mt-6 h-full">
      <div className="flex gap-2 items-center">
        <Link
          to={`/Sandbox`}
          style={{
            textDecoration: "none",
          }}
        >
          <img src="/backtick.svg" />
        </Link>
        <p className="text-xl font-medium text-[#084298] capitalize">
          {userState?.name}
        </p>
      </div>
      <div className="rounded-lg bg-white p-4 flex flex-col gap-4 w-full h-full relative">
        <Tabs>
          <TabList className="!flex !justify-between !border-0 items-center">
            <div className="flex items-center gap-4">
              {tabs.map((x) => {
                return (
                  <Tab
                    px={"24px"}
                    py={"6px"}
                    borderRadius={"4px"}
                    borderWidth={"1px"}
                    fontSize={"16px"}
                    style={{
                      borderColor: x == page ? "#6CA6FC" : "#EBEBEB",
                      fontWeight: x == page ? 500 : 400,
                      color: x == page ? "#084298" : "#605D64",
                      cursor: x != page ? "pointer" : "default",
                      backgroundColor: x == page ? "#F1F7FF" : "#fff",
                    }}
                    onClick={() => setPage(x)}
                  >
                    {x}
                  </Tab>
                );
              })}
            </div>
            {page == "Project details" ? (
              <div className="flex items-center gap-3">
                <p className="text-[#938F96] text-sm">Last updated</p>
                <p className="text-[#938F96] text-sm">
                  {new Date(userState?.lastUpdatedAt).toLocaleString()}
                </p>
              </div>
            ) : modelInfo?.status == "COMPLETED" ? (
              <div className="flex flex-col gap-0 absolute top-2 right-2 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <p className="text-[#938F96] text-sm w-[100px]">Model accuracy</p>
                  <p className="text-[#69B04B] text-sm font-medium">
                    {Math.round(
                      modelInfo?.performance?.average_precision * 100
                    )}%
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-[#938F96] text-sm w-[100px]">Model recall</p>
                  <p className="text-[#69B04B] text-sm font-medium">
                    {Math.round(modelInfo?.performance?.recall * 100)}%
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-[#938F96] text-sm">
                STATUS: {modelInfo?.status}
              </p>
            )}
          </TabList>

          <TabPanels>
            <TabPanel className="!pl-0 !pr-0">
              <ViewForm userState={userState} />
            </TabPanel>
            <TabPanel className="!pl-0 !pr-0">
              <div className="grid grid-cols-4 gap-4 w-full h-fit">
                {[...Array(10)].map((x) => {
                  return <PredictionCard />;
                })}
              </div>
            </TabPanel>
            <TabPanel className="!pl-0 !pr-0">
              <OutputDetail userState={userState} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default DetailView;
