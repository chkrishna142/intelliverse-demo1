import { useEffect, useState, useContext, type, useRef } from "react";
import NavContext from "../../NavContext";
import { baseURL } from "../../../index";
import { useParams } from "react-router-dom";
import PieChart from "../../Charts/SizingCharts/PieChart";
import StackBarChart from "../../Charts/SizingCharts/StackBarChart";
import FloatingInput from "../SizingUtils/FloatingInput";
import HistoryAnalytics from "../SizingComponents/HistoryAnalytics";
import { Select, Spinner } from "@chakra-ui/react";
import BoxPlotAnalysis from "../SizingComponents/BoxPlotAnalysis";
import axios from "axios";
import LiquidGauge from "../../Charts/SizingCharts/LiquidGauge";
import MoistureChart from "../../Charts/SizingCharts/MoistureChart";
import { useWindowSize } from "@uidotdev/usehooks";

const analysisType = {
  0: "Size Disribution",
  1: "Color Analysis",
  2: "Moisture Analysis",
};

const Analytics = ({ plantId, cameraId, disable, plantCamMap }) => {
  let param = useParams();
  const { auth } = useContext(NavContext);
  const size = useWindowSize();
  let material = param.material.toLowerCase();
  const [sizeData, setSizeData] = useState([]);
  const [sizeDataChanging, setSizeDataChanging] = useState(false);
  const [selectedBasis, setSelectedBasis] = useState(0);
  const typeRef = useRef();
  const [avgMoisture, setAvgMoisture] = useState(0);
  const [selectedRange, setSelectedRange] = useState(0);
  const [selectedPlant, setSelectedPlant] = useState(plantId);
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
      material: param.material.toLowerCase(),
      cameraId:
        selectedCam === "All Cams" || selectedPlant === "All Plants"
          ? "all"
          : selectedCam,
      plantName: selectedPlant === "All Plants" ? "all" : selectedPlant,
      startDate: new Date(fromTime).getTime(),
      endDate:
        new Date(toTime).getTime() + 11 * 60 * 60 * 1000 + 59 * 60 * 1000,
      distType: typeRef.current,
    });
    const response = await axios
      .post(baseURL + "vision/v2/sizing/analytics/distribution/", requestData, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
      .then((response) => {
        setSizeData(response.data);
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
    typeRef.current = "SIZE";
    setSelectedBasis(0);
    setSizeDataChanging(true);
    apiCall();
  }, []);

  useEffect(() => {
    if (selectedBasis == 0) typeRef.current = "SIZE";
    else if (selectedBasis == 1) typeRef.current = "COLOR";
    else typeRef.current = "MOISTURE";
    handleClick();
  }, [selectedBasis]);

  useEffect(() => {
    if (typeRef.current == "MOISTURE") {
      let sum = 0;
      let count = 0;
      sizeData.map((i) => {
        if (i.moisture != 0) {
          sum += i.moisture;
          count++;
        }
      });
      let avgSum = count == 0 ? 0 : sum / count;
      setAvgMoisture(avgSum);
    }
  }, [typeRef.current, sizeData]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col p-6 pt-4 bg-white rounded-xl">
        <div
          className={`flex ${
            material === "coal"
              ? "justify-between"
              : "justify-start xl:justify-end"
          } items-center overflow-x-auto h-[60px]`}
        >
          {material === "coal" && (
            <div className="flex gap-6 text-[#49454F] text-xs lg:text-base min-w-[445px]">
              <div
                className={`p-3 flex items-center gap-1 ${
                  selectedBasis == 0 ? "bg-[#e7effb] rounded-xl" : "bg-white"
                }`}
              >
                <input
                  value={0}
                  checked = {selectedBasis == 0}
                  onChange={(e) => setSelectedBasis(e.target.value)}
                  type="radio"
                  name="freq"
                  className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
                />
                <p>Size distribution</p>
              </div>
              <div
                className={`p-3 flex items-center gap-1 ${
                  selectedBasis == 1 ? "bg-[#e7effb] rounded-xl" : "bg-white"
                }`}
              >
                <input
                  value={1}
                  checked = {selectedBasis == 1}
                  onChange={(e) => setSelectedBasis(e.target.value)}
                  type="radio"
                  name="freq"
                  className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
                />
                <p>Colour Analysis</p>
              </div>
              <div
                className={`p-3 flex items-center gap-1 ${
                  selectedBasis == 2 ? "bg-[#e7effb] rounded-xl" : "bg-white"
                }`}
              >
                <input
                  value={2}
                  checked = {selectedBasis == 2}
                  onChange={(e) => setSelectedBasis(e.target.value)}
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
            <button
              className="text-center py-2 px-4 text-white text-xs md:text-base font-medium bg-[#6CA6FC] rounded-full min-w-[80px]"
              onClick={handleClick}
            >
              {sizeDataChanging ? <Spinner /> : "Apply"}
            </button>
          </div>
        </div>
        <p className="text-[#3E3C42] font-medium text-xl">{analysisType[selectedBasis]}</p>
        {sizeData.length != 0 && (
          <div className="flex gap-1 sm:gap-[40px] items-center overflow-x-auto min-h-[280px]">
            <div className="ml-[-40px] sm:ml-0 min-w-[280px] w-[25vw]">
              {typeRef.current == "MOISTURE" ? (
                <LiquidGauge
                  moisture={avgMoisture}
                  r={Math.max(Math.ceil((size.width * 20) / 200), 80)}
                />
              ) : (
                <PieChart
                  data={sizeData}
                  type={typeRef.current.toLowerCase()}
                />
              )}
            </div>
            <div className="ml-[-40px] sm:ml-0 h-[35vh] min-w-[680px] flex-grow">
              {typeRef.current == "MOISTURE" ? (
                <MoistureChart data={sizeData} />
              ) : (
                <StackBarChart
                  data={sizeData}
                  type={typeRef.current.toLowerCase()}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {(disable || Object.keys(plantCamMap).length != 0) && (
        <BoxPlotAnalysis
          plantId={disable ? plantId : Object.keys(plantCamMap)[0]}
          cameraId={
            disable ? cameraId : plantCamMap[Object.keys(plantCamMap)[0]][0]
          }
          disable={disable}
          plantCamMap={plantCamMap}
        />
      )}
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
