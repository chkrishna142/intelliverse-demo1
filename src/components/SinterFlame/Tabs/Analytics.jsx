import { useEffect, useState, useContext, type, useRef } from "react";
import NavContext from "../../NavContext";
import { baseURL } from "../../../index";
import { useParams } from "react-router-dom";
import SpiderChart from "../../Charts/SinterFlameCharts/SpiderChart";
import StackBarChart from "../../Charts/SinterFlameCharts/StackBarChart";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { Select, Spinner } from "@chakra-ui/react";
import HistoryAnalytics from "../components/HistoryAnalytics";
import axios from "axios";

const Analytics = ({ plantId, cameraId, disable, plantCamMap }) => {
  let param = useParams();
  const { auth } = useContext(NavContext);
  const [graphData, setGraphData] = useState([]);
  const [sizeDataChanging, setSizeDataChanging] = useState(false);
  const [selectedRange, setSelectedRange] = useState(0);
  const [selectedPlant, setSelectedPlant] = useState(plantId);
  const [avgMgw, setAvgMgw] = useState(0);
  const [selectedCam, setSelectedCam] = useState(cameraId);
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
      distType: "HEALTHINDEX",
    });
    const response = await axios
      .post(
        baseURL + "vision/v2/processMonitoring/analytics/distribution/",
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
    let gap = 0;
    let count = 0;
    graphData.map((i) => {
      if (i.mgw != 0) {
        gap += i.mgw;
        count++;
      }
    });
    setAvgMgw(count == 0 ? 0 : (gap / count).toFixed(2));
  }, [graphData]);

  return (
    <div className="flex flex-col gap-4">
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
            {/* <div className="min-w-[110px]">
              <Select
                borderColor="#CAC5CD"
                color="#605D64"
                placeholder={disable && cameraId}
                variant="outline"
                isDisabled={disable || selectedPlant == "All Plants"}
                className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
                onChange={(e) => setSelectedCam(e.target.value)}
                value={selectedCam}
              >
                {" "}
                <option key="All Burners" value="All Burners">
                  All Burners
                </option>
                {!disable &&
                  selectedPlant != "All Plants" &&
                  plantCamMap[selectedPlant].map((cam) => {
                    return (
                      <option key={cam} value={cam}>
                        {cam}
                      </option>
                    );
                  })}
              </Select>
            </div> */}
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
          Burner Health Distribution
        </p>
        <div className="flex gap-1 sm:gap-[40px] items-center overflow-x-auto min-h-[280px]">
          <div className="ml-0 min-w-[285px] w-[25vw] h-[35vh]">
            <SpiderChart data={graphData} />
          </div>
          <div className="ml-[-10px] sm:ml-0 h-[35vh] min-w-[680px] flex-grow">
            <StackBarChart data={graphData} />
          </div>
        </div>
      </div>
      {(disable || Object.keys(plantCamMap).length != 0) && (
        <HistoryAnalytics
          plantId={disable ? plantId : Object.keys(plantCamMap)[0]}
          cameraId={
            disable ? cameraId : plantCamMap[Object.keys(plantCamMap)[0]][0]
          }
          disable={disable}
          plantCamMap={plantCamMap}
        />
      )}
    </div>
  );
};

export default Analytics;
