import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import NavContext from "../../NavContext";
import { baseURL } from "../../../index";
import { Spinner } from "@chakra-ui/react";
import AlertTable from "../Tables/AlertTable";
import AlertCard from "../Components/AlertCard";

const Alerts = ({ plantId, cameraId, disable, plantCamMap }) => {
  const param = useParams();
  const { auth } = useContext(NavContext);
  const [alerts, setAlerts] = useState([]);
  const [alertsChanging, setAlertsChanging] = useState(false);
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
  const [selectedPlant, setSelectedPlant] = useState(
    disable ? plantId : "All Plants"
  );
  const [selectedCam, setSelectedCam] = useState(
    disable ? cameraId : "All Cams"
  );

  const entries = [
    "Clamp and Chock",
    "Safety",
    "Dip rod test",
    "Flushing",
    "Sampling",
    "Lids closed",
  ];
  const count = [66, 100, 65, 50, 80, 78];
  const total = [70, 100, 80, 52, 100, 100];
  const color = [0, 1, 2, 0, 2, 2];

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
          <button className="text-center p-[10px] pl-4 pr-4 text-white text-xs md:text-base font-medium bg-[#084298] rounded-full">
            {alertsChanging ? <Spinner /> : "Show Alerts"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-[160px] md:mt-11 pt-[57px] bg-white rounded-xl justify-start">
        <div className="flex flex-col gap-4">
          <p className="pl-6 text-xl font-medium text-[#3E3C42]">
            How you are doing
          </p>
          <div className="px-4 flex gap-4 justify-between flex-wrap">
            {entries.map((val, idx) => {
              return (
                <AlertCard
                  parameter={val}
                  count={count[idx]}
                  total={total[idx]}
                  val={color[idx]}
                />
              );
            })}
          </div>
        </div>
        {true && <AlertTable />}
      </div>
    </div>
  );
};

export default Alerts;
