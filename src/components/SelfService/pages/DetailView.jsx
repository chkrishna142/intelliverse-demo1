import { useState, useContext, useEffect } from "react";
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

  const getSingle = async () => {
    try {
      const param = {
        projectId: projectId,
      };
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
        newData["name"] = data?.name || "";
        newData["dataType"] =
          Capitalize(data?.detail[0]?.datasetType) || "Image";
        newData["whatToDetect"] = data?.remarks || "";
        newData["isAnnotated"] = data?.isAnnotated ? "Yes" : "No";
        newData["annotationType"] =
          Capitalize(data?.detail[0]?.modelType) || "Classify";
        newData["savedFiles"] = "Dummy";
        newData["uploadedFiles"] =
          data?.detail[0]?.dataset?.[
            Object.keys(data?.detail[0]?.dataset)[0]
          ] || {};
        return newData;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingle();
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
      <div className="rounded-lg bg-white p-4 flex flex-col gap-4 w-full h-full">
        <div className="flex justify-between items-end">
          <div className="flex gap-4 items-center">
            {tabs.map((x) => {
              return (
                <div
                  className="px-6 py-[6px] rounded text-base border"
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
                </div>
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
          ) : (
            <div className="flex items-center gap-3">
              <p className="text-[#938F96] text-sm">Model accuracy</p>
              <p className="text-[#69B04B] text-sm font-medium">76%</p>
            </div>
          )}
        </div>
        {page == "Project details" && <ViewForm userState={userState} />}
        {page == "Model output overview" && (
          <div className="grid grid-cols-4 gap-4 w-full h-fit">
            {[...Array(10)].map((x) => {
              return <PredictionCard />;
            })}
          </div>
        )}
        {page == "Model output details" && <OutputDetail />}
      </div>
    </div>
  );
};

export default DetailView;
