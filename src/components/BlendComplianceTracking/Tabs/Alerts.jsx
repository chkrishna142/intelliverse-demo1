import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import NavContext from "../../NavContext";
import { baseURL } from "../../../index";
import { Spinner } from "@chakra-ui/react";
import AlertTable from "../Tables/AlertTable";
import AlertCard from "../Components/AlertCard";

const dummy = [
  {
    id: 1,
    loaderID: 4,
    date: "11/29/2023",
    startTs: 1638290123,
    violation: "Violation 1",
    annotatedImage: "Image 1",
  },
  {
    id: 2,
    loaderID: 5,
    date: "11/29/2023",
    startTs: 1638290145,
    violation: "Violation 2",
    annotatedImage: "Image 2",
  },
  {
    id: 3,
    loaderID: 4,
    date: "11/29/2023",
    startTs: 1638290167,
    violation: "Violation 3",
    annotatedImage: "Image 3",
  },
  {
    id: 4,
    loaderID: 5,
    date: "11/29/2023",
    startTs: 1638290189,
    violation: "Violation 4",
    annotatedImage: "Image 4",
  },
  {
    id: 5,
    loaderID: 4,
    date: "11/29/2023",
    startTs: 1638290211,
    violation: "Violation 5",
    annotatedImage: "Image 5",
  },
  {
    id: 6,
    loaderID: 5,
    date: "11/29/2023",
    startTs: 1638290233,
    violation: "Violation 6",
    annotatedImage: "Image 6",
  },
  {
    id: 7,
    loaderID: 4,
    date: "11/29/2023",
    startTs: 1638290255,
    violation: "Violation 7",
    annotatedImage: "Image 7",
  },
  {
    id: 8,
    loaderID: 5,
    date: "11/29/2023",
    startTs: 1638290277,
    violation: "Violation 8",
    annotatedImage: "Image 8",
  },
  {
    id: 9,
    loaderID: 4,
    date: "11/29/2023",
    startTs: 1638290299,
    violation: "Violation 9",
    annotatedImage: "Image 9",
  },
  {
    id: 10,
    loaderID: 5,
    date: "11/29/2023",
    startTs: 1638290321,
    violation: "Violation 10",
    annotatedImage: "Image 10",
  },
];

const Alerts = ({ plantId, cameraId, disable, plantCamMap }) => {
  const param = useParams();
  const { auth } = useContext(NavContext);
  const [alerts, setAlerts] = useState(dummy);
  const [alertCards, setAlertCards] = useState({});
  const [alertsChanging, setAlertsChanging] = useState(false);
  const [filterData, setFilterData] = useState({ items: [] });
  const [fromTime, setFromTime] = useState(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000 + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16)
  );
  const [toTime, setToTime] = useState(
    new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16)
  );

  const AlertApi = async () => {
    const requestData = JSON.stringify({
      clientId: param.clientId.toLowerCase(),
      useCase: param.material.toUpperCase(),
      plantName: "khandala",
      cameraGpId: "all",
      startDate: new Date(fromTime).getTime() + 5.5 * 60 * 60 * 1000,
      endDate: new Date(toTime).getTime() + 5.5 * 60 * 60 * 1000,
    });
    const response = await axios
      .post(
        baseURL + "vision/v1/workforceMonitoring/alerts/ranged/",
        requestData,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      )
      .then((response) => {
        setAlertCards(response.data.eventSummary);
        setAlerts(response.data.subEventHistory.data);
        setAlertsChanging(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () => {
    // setAlertsChanging(true);
    // AlertApi();
  };

  useEffect(() => {
    // handleClick();
  }, []);

  const loaders = ["Loader 4", "Loader 5"];
  const counts = [
    { total: 42, passed: 35 },
    { total: 42, passed: 39 },
  ];

  return (
    <div className="relative flex flex-col">
      <div className="absolute left-0 right-0 flex justify-center">
        <div className="p-5 pl-6 pr-6 gap-6 flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md">
          <div>
            <FloatingInput
              text="From"
              type="datetime-local"
              setDateTime={setFromTime}
              value={fromTime}
            />
          </div>
          <div>
            <FloatingInput
              text="To"
              type="datetime-local"
              setDateTime={setToTime}
              value={toTime}
            />
          </div>
          <button
            className="text-center p-[10px] pl-4 pr-4 text-white text-xs md:text-base font-medium bg-[#084298] rounded-full hover:scale-105"
            onClick={handleClick}
          >
            {alertsChanging ? <Spinner /> : "Show Alerts"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-[160px] md:mt-11 pt-[57px] bg-white rounded-xl justify-start">
        <div className="flex flex-col gap-4">
          <p className="pl-6 text-xl font-medium text-[#3E3C42]">
            How you are doing
          </p>
          <div className="px-4 flex gap-4 justify-start flex-wrap">
            {loaders.map((val, idx) => {
              return (
                <AlertCard
                  parameter={val}
                  count={counts[idx].passed}
                  total={counts[idx].total}
                  setFilterData={setFilterData}
                />
              );
            })}
          </div>
          <div className="pl-6 flex items-center gap-1">
            <img src="/BlendComplianceIcons/info.svg" alt="no support" />
            <p className="text-[#938F96] text-xs">
              No. of compliant rounds  / Total no. of rounds{" "}
            </p>
          </div>
        </div>
        {alerts.length > 0 && (
          <AlertTable
            rowData={alerts}
            filterData={filterData}
            setFilterModel={setFilterData}
          />
        )}
      </div>
    </div>
  );
};

export default Alerts;
