import { useEffect, useState, useContext } from "react";
import NavContext from "../../NavContext";
import { baseURL } from "../../../index";
import { useParams } from "react-router-dom";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import BoxPlotChart from "../../Charts/SizingCharts/BoxPlotChart";
import axios from "axios";
import { Select, Spinner } from "@chakra-ui/react";

const BoxPlotAnalysis = ({ plantId, cameraId, disable, plantCamMap }) => {
  const { auth } = useContext(NavContext);
  let param = useParams();
  const [plotData, setPlotData] = useState({});
  const [plotDataChanging,setPlotDataChanging] = useState(false);
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
      plantName: selectedPlant,
      startDate: new Date(fromTime).getTime(),
      endDate: new Date(toTime).getTime() + 11*60*60*1000 + 59*60*1000,
      cameraId: selectedCam,
      plotParam: "MPS",
    });
    const response = await axios
      .post(baseURL + "vision/v2/sizing/analytics/plot/", requestData, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
      .then((response) => {
        setPlotData(response.data);
        setPlotDataChanging(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () =>{
    setPlotDataChanging(true);
    apiCall();
  }

  useEffect(()=>{
    handleClick();
  },[]);

  useEffect(() => {
    if(!disable){
      setSelectedCam(plantCamMap[selectedPlant][0])
    }
  },[selectedPlant])

  return (
    <div className="relative flex flex-col gap-4 rounded-xl bg-white">
      <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center gap-2 pt-6">
        <p className="text-[#3E3C42] text-xl font-medium pl-6">Box Plot</p>
        <div className="flex justify-start md:justify-end items-center gap-4 pr-6 pl-6 md:pl-0 overflow-x-auto max-w-[90vw] h-[60px]">
          <div className="min-w-[110px]">
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              variant="outline"
              placeholder={disable && plantId}
              isDisabled={disable}
              className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
            >
              {!disable &&
                Object.keys(plantCamMap)?.map((plant) => {
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
              placeholder={disable && cameraId}
              variant="outline"
              isDisabled={disable}
              className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
              value={selectedCam}
              onChange={(e) => setSelectedCam(e.target.value)}
            >
              {!disable &&
                plantCamMap[selectedPlant]?.map((cam) => {
                  return (
                    <option key={cam} value={cam}>
                      {cam}
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
              />
            </div>
          )}
          <button
            className="text-center py-2 px-4 text-white text-xs md:text-base font-medium bg-[#6CA6FC] rounded-full min-w-[80px]"
            onClick={handleClick}
          >
            {plotDataChanging ? <Spinner /> : "Apply"}
          </button>
        </div>
      </div>
      <div className="h-[60vh]">
        {plotData.hasOwnProperty("data") && (
          <BoxPlotChart data={plotData.data} />
        )}
      </div>
    </div>
  );
};

export default BoxPlotAnalysis;
