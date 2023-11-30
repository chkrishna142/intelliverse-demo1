import { useEffect, useState, useContext, useRef } from "react";
import NavContext from "../../NavContext";
import { useParams } from "react-router-dom";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { baseURL } from "../../../index";
import axios from "axios";
import DowntimeChart from "../../Charts/SinterFlameCharts/DowntimeChart";
import { Select, Spinner } from "@chakra-ui/react";

const DowntimeAnalytics = ({ plantId, cameraId, disable, plantCamMap }) => {
  let param = useParams();
  const { auth } = useContext(NavContext);
  const [graphData, setGraphData] = useState([]);
  const [sizeDataChanging, setSizeDataChanging] = useState(false);
  const [selectedRange, setSelectedRange] = useState(0);
  const [selectedPlant, setSelectedPlant] = useState(plantId);
  const [fromTime, setFromTime] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );
  const [toTime, setToTime] = useState(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );

  const handleRangeSelect = (e) => {
    setSelectedRange(e.target.value);
    if (e.target.value == 0) {
      setFromTime(
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
      setToTime(
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
    }
  };

  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: param.clientId.toLowerCase(),
      useCase: "SINTERFLAME",
      cameraId: "all",
      plantName: selectedPlant === "All Plants" ? "all" : selectedPlant,
      startDate: new Date(fromTime).getTime(),
      endDate:
        new Date(toTime).getTime() + 11 * 60 * 60 * 1000 + 59 * 60 * 1000,
      distType: "downtimeFlag",
    });
    const response = await axios
      .post(
        baseURL + "vision/v2/processMonitoring/analytics/frequency/",
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
        setGraphData(response.data);
        setSizeDataChanging(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () => {
    setSizeDataChanging(true);
    apiCall();
  };

  useEffect(() => {
    handleClick();
  }, []);

  useEffect(() => {
    if (selectedRange == 1) {
      setToTime(
        new Date(new Date(fromTime).getTime() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
    }
  }, [fromTime]);

  return (
    <div className="flex flex-col p-6 pt-4 bg-white rounded-xl">
      <div className="flex justify-start xl:justify-end items-center overflow-x-auto h-[60px]">
        <div className="flex items-center gap-2">
          <div className="min-w-[110px]">
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              placeholder={disable && plantId}
              variant="outline"
              isDisabled={disable}
              className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
              onChange={(e) => setSelectedPlant(e.target.value)}
              value={selectedPlant}
            >
              <option key="All Plants" value="All Plants">
                All Plants
              </option>
              {!disable &&
                Object.keys(plantCamMap).map((plant) => {
                  return (
                    <option key={plant} value={plant}>
                      {plant}
                    </option>
                  );
                })}
            </Select>
          </div>
          <div className="min-w-[110px]">
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              value={selectedRange}
              variant="outline"
              className="!rounded-2xl !text-sm !font-medium !text-[#605D64]"
              onChange={(e) => handleRangeSelect(e)}
            >
              <option key="Last 7 days" value={0}>
                Last 7 days
              </option>
              <option key="custom" value={1}>
                Custom
              </option>
            </Select>
          </div>
          {selectedRange == 1 && (
            <div className="min-w-[110px]">
              <FloatingInput
                text="From"
                type="date"
                setDateTime={setFromTime}
                value={fromTime}
              />
            </div>
          )}
          {selectedRange == 1 && (
            <div className="min-w-[110px]">
              <FloatingInput
                text="To"
                type="date"
                setDateTime={setToTime}
                value={toTime}
                min={fromTime}
                max={new Date(
                  new Date(fromTime).getTime() + 7 * 24 * 60 * 60 * 1000
                )
                  .toISOString()
                  .slice(0, 10)}
              />
            </div>
          )}
          <button
            className="text-center py-2 px-4 text-white text-xs md:text-base font-medium bg-[#6CA6FC] rounded-full min-w-[80px]"
            onClick={handleClick}
          >
            {sizeDataChanging ? <Spinner /> : "Apply"}
          </button>
        </div>
      </div>
      <p className="text-[#3E3C42] font-medium text-xl">
        Downtime Distribution
      </p>
      <div className="flex gap-1 sm:gap-[40px] items-center overflow-x-auto min-h-[280px]">
        <div className=" h-[35vh] min-w-[680px] flex-grow">
          <DowntimeChart data={graphData} />
        </div>
      </div>
    </div>
  );
};

export default DowntimeAnalytics;
