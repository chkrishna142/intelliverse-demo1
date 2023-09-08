import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PieChart from "../../Charts/SizingCharts/PieChart";
import StackBarChart from "../../Charts/SizingCharts/StackBarChart";
import FloatingInput from "../SizingUtils/FloatingInput";
import HistoryAnalytics from "../SizingComponents/HistoryAnalytics";
import { Select, Skeleton } from "@chakra-ui/react";
import axios from "axios";

const Analytics = ({ plantId, cameraId, disable, plantCamMap }) => {
  let param = useParams();
  let material = param.material.toLowerCase();
  const [sizeData, setSizeData] = useState([]);
  const [sizeDataChanging, setSizeDataChanging] = useState(false);
  const [selectedBasis, setSelectedBasis] = useState("SIZE");
  const [selectedRange, setSelectedRange] = useState(0);
  const [selectedPlant, setSelectedPlant] = useState(
    disable ? plantId : "All Plants"
  );
  const [selectedCam, setSelectedCam] = useState(
    disable ? cameraId : "All Cams"
  );
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
  const prevFromTimeRef = useRef();
  const prevToTimeRef = useRef();

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
      material: param.material.toLowerCase(),
      cameraId: selectedCam === "All Cams" ? "all" : selectedCam,
      plantName: selectedPlant === "All Plants" ? "all" : selectedPlant,
      startDate: new Date(fromTime).getTime(),
      endDate: new Date(toTime).getTime(),
      distType: selectedBasis,
    });
    const response = await axios
      .post(
        " https://intelliverse.backend-ripik.com/vision/v2/sizing/analytics/distribution/",
        requestData,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setSizeData(response.data);
        setSizeDataChanging(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    apiCall();
    prevFromTimeRef.current = fromTime;
    prevToTimeRef.current = toTime;
  }, []);

  useEffect(() => {
    if (
      prevToTimeRef.current !== toTime &&
      prevFromTimeRef.current !== fromTime
    ) {
      setSizeDataChanging(true);
      // console.log(fromTime, toTime, "changed");
      apiCall();
      prevFromTimeRef.current = fromTime;
      prevToTimeRef.current = toTime;
    }
  }, [toTime, fromTime]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col p-6 pt-4 bg-white rounded-xl">
        <div
          className={`flex ${
            material === "coal" ? "justify-between" : "justify-end"
          } items-center overflow-x-auto h-[60px]`}
        >
          {material === "coal" && (
            <div className="flex gap-6 text-[#49454F] text-xs lg:text-base min-w-[445px]">
              <div
                className={`p-3 flex items-center gap-1 ${
                  selectedBasis === 0 ? "bg-[#e7effb] rounded-xl" : "bg-white"
                }`}
              >
                <input
                  value="SIZE"
                  onClick={(e) => setSelectedBasis(e.target.value)}
                  type="radio"
                  name="freq"
                  className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
                />
                <p>Size distribution</p>
              </div>
              <div
                className={`p-3 flex items-center gap-1 ${
                  selectedBasis === 1 ? "bg-[#e7effb] rounded-xl" : "bg-white"
                }`}
              >
                <input
                  value="COLOR"
                  onClick={(e) => setSelectedBasis(e.target.value)}
                  type="radio"
                  name="freq"
                  className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
                />
                <p>Colour Analysis</p>
              </div>
              <div
                className={`p-3 flex items-center gap-1 ${
                  selectedBasis === 2 ? "bg-[#e7effb] rounded-xl" : "bg-white"
                }`}
              >
                <input
                  value="MOISTURE"
                  onClick={(e) => setSelectedBasis(e.target.value)}
                  type="radio"
                  name="freq"
                  className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
                />
                <p>Moisture analysis</p>
              </div>
            </div>
          )}
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
            {selectedPlant !== "All Plants" && (
              <div className="min-w-[110px]">
                <Select
                  borderColor="#CAC5CD"
                  color="#605D64"
                  placeholder={disable && cameraId}
                  variant="outline"
                  isDisabled={disable}
                  className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
                  onChange={(e) => setSelectedCam(e.target.value)}
                  value={selectedCam}
                >
                  {" "}
                  <option key="All Cams" value="All Cams">
                    All Cams
                  </option>
                  {!disable &&
                    plantCamMap[selectedPlant].map((cam) => {
                      return (
                        <option key={cam} value={cam}>
                          {cam}
                        </option>
                      );
                    })}
                </Select>
              </div>
            )}
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
          </div>
        </div>
        <p className="text-[#3E3C42] font-medium text-xl">Size Distribution</p>
        {sizeDataChanging && <Skeleton height="20px" />}
        {sizeData.length != 0 && (
          <div className="flex gap-1 sm:gap-[40px] items-center overflow-x-auto min-h-[280px]">
            <div className="ml-[-40px] sm:ml-0 min-w-[280px] w-[25vw]">
              <PieChart data={sizeData} type={selectedBasis.toLowerCase()} />
            </div>
            <div className="ml-[-40px] sm:ml-0 h-[35vh] min-w-[680px] flex-grow">
              <StackBarChart
                data={sizeData}
                type={selectedBasis.toLowerCase()}
              />
            </div>
          </div>
        )}
      </div>
      {(disable || Object.keys(plantCamMap) != 0) && (
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
