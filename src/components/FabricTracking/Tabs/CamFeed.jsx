import axios from "axios";
import { useState, useEffect, useContext } from "react";
import NavContext from "../../NavContext";
import LineChart from "../../Charts/QualityCharts/LineChart";
import SpiderChart from "../../Charts/QualityCharts/SpiderChart";
import { Spinner } from "@chakra-ui/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { baseURL } from "../../../index";

const CamFeed = ({ material, cameraId, clientId, callApi, initialRender }) => {
  const size = useWindowSize();
  const { auth } = useContext(NavContext);
  const [camData, setCamData] = useState("");
  const [bulkData, setBulkData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      useCase: material.toUpperCase(),
      cameraId: cameraId,
    });
    const response = await axios
      .post(
        baseURL + "vision/v2/qualityTracking/analysis/detail/",
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
        setCamData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const apiCallPopulate = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      useCase: material.toUpperCase(),
      cameraId: cameraId,
      chartSize: 10,
    });
    const response = await axios
      .post(baseURL + "vision/v2/qualityTracking/analysis/list/", requestData, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
      .then((response) => {
        setBulkData(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (bulkData.length !== 0) {
      let currentIndex = 0;
      setTimeout(() => {
        setLoaded(true);
      }, [bulkData.length * 1000]);
      const intervalId = setInterval(() => {
        if (currentIndex < bulkData.length) {
          setCamData(bulkData[currentIndex]);
          currentIndex++;
        } else {
          // All items processed, clear the interval
          clearInterval(intervalId);
        }
      }, 1000);
      return () => {
        clearInterval(intervalId); // Clear the interval on component unmount
      };
    }
  }, [bulkData]);

  useEffect(() => {
    apiCallPopulate();
  }, []);

  useEffect(() => {
    if (!initialRender) {
      console.log("calling...");
      apiCall();
    }
  }, [callApi]);

  return (
    <>
      {camData && (
        <div
          className={`flex flex-col gap-2 transition ease-in duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-xl p-4 pr-6 pl-6 bg-white">
            <div className="flex flex-col gap-2 items-center w-full">
              <p className="self-start text-[#3E3C42] text-sm">
                Original Image
              </p>
              <div className="w-full h-full bg-black rounded-xl flex justify-center">
                <img
                  className="rounded-lg h-[25vh]"
                  src={camData.originalImage}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
              <p className="self-start text-[#3E3C42] text-sm">
                Perspective Image
              </p>
              <div className="w-full h-full bg-black rounded-xl flex justify-center">
                <img
                  className="rounded-lg h-[25vh]"
                  src={camData.perspectiveImage}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
              <p className="self-start text-[#3E3C42] text-sm">
                Particle analysis
              </p>
              <div className="w-full h-full bg-black rounded-xl flex justify-center">
                <img
                  className="rounded-lg h-[25vh]"
                  src={camData.analysisImage}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col min-[1150px]:flex-row gap-2">
            <div className="flex flex-col gap-4 rounded-xl p-6 pt-4 bg-white">
              <div className="flex justify-between items-baseline">
                <p className="text-[#3E3C42] text-xl font-medium">
                  Current analysis
                </p>
                <p className="text-[#938F96] text-xs">
                  Last updated{" "}
                  {new Date(camData.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex flex-col-reverse gap-4">
                <div className="flex flex-col gap-4">
                  <p className="text-base font-medium text-[#605D64]">
                    Gap width distribution
                  </p>
                  <div className="w-full min-[1150px]:w-[20vw] h-[50vh]">
                    <SpiderChart
                      points={camData.avgGapWidths[0]}
                      labels={camData.partitions[0]}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-base font-medium text-[#605D64]">MGW</p>
                  <div className="min-w-[150px] rounded-lg bg-[#f6faff] text-center py-[25px] pl-3 pr-7 text-[#1C56AC] text-2xl">
                    {camData.mgw.toFixed(2)} px
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 rounded-xl p-6 pt-4 bg-white w-full">
              <div className="flex flex-col xl:flex-row gap-6">
                <p className="text-[#3E3C42] text-xl font-medium">
                  Trend analysis
                </p>
                <div className="px-4 py-1 flex gap-4 rounded-lg bg-[#f6faff] text-base font-medium overflow-x-auto">
                  <div className="flex gap-2 px-3 py-[2px] items-baseline">
                    <p className="text-[#605D64]">MGW</p>
                    <p> </p>
                  </div>
                  {camData.hasOwnProperty("mgwAvg") &&
                    Object.keys(camData.mgwAvg).map((i) => {
                      return (
                        <div className="flex gap-2 px-3 py-[2px] items-baseline min-w-[150px]">
                          <p className="text-[#1C56AC]">
                            {camData.mgwAvg[i]} px
                          </p>
                          <p className="text-[#605D64] text-xs font-normal">
                            {i}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="rounded-xl bg-white flex flex-col lg:flex-row gap-4 h-full">
                <div className="flex flex-col flex-1 gap-4">
                  <p className="text-[#605D64] font-medium text-base">
                    MGW Trend
                  </p>
                  <div
                    className={
                      material === "coal"
                        ? "h-[40vh]"
                        : "h-[40vh] min-[1150px]:h-full"
                    }
                  >
                    <LineChart
                      data={[camData.mgw]}
                      timeStamps={new Date(
                        camData?.timestamp.split(" ").join("T")
                      ).getTime()}
                      labels={['Mean gap Width']}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loaded && (
        <div
          style={{ top: camData ? "30%" : "100%" }}
          className="flex absolute right-[50%] opacity-100"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      )}
    </>
  );
};

export default CamFeed;
