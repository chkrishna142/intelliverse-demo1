import axios from "axios";
import { useState, useEffect } from "react";
import LineChart from "../../Charts/SizingCharts/LineCharts";
import DonutChart from "../../Charts/SizingCharts/DonutChart";
import LiquidGauge from "../../Charts/SizingCharts/LiquidGauge";
import { Spinner } from "@chakra-ui/react";

const CamFeed = ({ material, cameraId, clientId }) => {
  const [camData, setCamData] = useState("");
  const [bulkData, setBulkData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      material: material,
      cameraId: cameraId,
    });
    const response = await axios
      .post(
        "  https://intelliverse.backend-ripik.com/vision/v1/sizing/getDetailAnalysis/",
        requestData,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
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
      material: material,
      cameraId: cameraId,
    });
    const response = await axios
      .post(
        "https://intelliverse.backend-ripik.com/vision/v1/sizing/getDetailAnalysis/init/",
        requestData,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
    const intervalId = setInterval(() => {
      apiCall();
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {camData && (
        <div
          className={`flex flex-col gap-2 transition ease-in duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="grid grid-cols-3 gap-6 rounded-xl p-4 pr-6 pl-6 bg-white">
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
            {camData.noCoal === 0 ? (
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
            ) : (
              <div className="flex flex-col gap-8 items-center justify-center">
                <img src="/SizingIcons/noCoal.svg" className="h-[10vh]" />
                <p>No {material} on belt</p>
              </div>
            )}
            {camData.noCoal === 0 ? (
              <div className="flex flex-col gap-2 items-center w-full">
                <p className="self-start text-[#3E3C42] text-sm">
                  Particle analysis
                </p>
                <div className="w-full h-full bg-black rounded-xl flex justify-center">
                  <img
                    className="rounded-lg h-[25vh]"
                    src={camData.particleImage}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-8 items-center justify-center">
                <img src="/SizingIcons/noCoal.svg" className="h-[10vh]" />
                <p>No {material} on belt</p>
              </div>
            )}
          </div>
          <div
            className={
              material === "coal" ? "flex flex-col gap-2" : "flex gap-2"
            }
          >
            <div className="flex flex-col gap-4 rounded-xl p-6 pt-4 bg-white">
              <p className="text-[#3E3C42] text-xl font-medium">
                Current analysis
              </p>
              {camData.noCoal === 0 ? (
                <div
                  className={
                    material === "coal"
                      ? "flex gap-[64px]"
                      : "flex flex-col-reverse gap-4"
                  }
                >
                  <div className="flex flex-col gap-4">
                    <p className="text-base font-medium text-[#605D64]">
                      Size distribution
                    </p>
                    <div
                      className={
                        material === "coal"
                          ? "w-[30vw] h-[30vh]"
                          : "w-[20vw] h-[50vh]"
                      }
                    >
                      <DonutChart
                        data={Object.values(camData.size)}
                        labels={Object.keys(camData.size)}
                        position={material === 'coal' ? 'right' : 'bottom'}
                      />
                    </div>
                  </div>
                  {material === "coal" && (
                    <div className="flex flex-col gap-4">
                      <p className="text-base font-medium text-[#605D64]">
                        Color Distribution
                      </p>
                      <div className="h-full w-[6vw] flex flex-col gap-1">
                        <div
                          style={{ height: `${camData.color.gray}%` }}
                          className="bg-[#79767D] rounded-tr-lg rounded-tl-lg text-white text-center text-lg font-medium"
                        >
                          {camData.color.gray.toFixed(2)}%
                        </div>
                        <div
                          style={{ height: `${camData.color.black}%` }}
                          className="bg-black rounded-br-lg rounded-bl-lg text-white text-center text-lg font-medium"
                        >
                          {camData.color.black.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  )}
                  {material === "coal" && (
                    <div className="flex flex-col gap-4">
                      <p className="text-base font-medium text-[#605D64]">
                        Moisture Content
                      </p>
                      <div className="">
                        <LiquidGauge moisture={camData.moisture} r={100} />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-4">
                    <p className="text-base font-medium text-[#605D64]">MPS</p>
                    <div className="rounded-lg bg-[#f6faff] text-center py-[25px] pl-3 pr-7 text-[#1C56AC] text-2xl">
                      {material === 'coal' ? '12.00' : camData.mps.toFixed(2)} mm
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-8 items-center justify-center h-full">
                  <img src="/SizingIcons/noCoal.svg" className="h-[10vh] w-[30vw]" />
                  <p>No {material} on belt</p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-6 rounded-xl p-6 pt-4 bg-white w-full">
              <div className="flex gap-6">
                <p className="text-[#3E3C42] text-xl font-medium">
                  Trend analysis
                </p>
                <div className="px-4 py-1 flex gap-4 rounded-lg bg-[#f6faff]">
                  <div className="flex gap-2 px-3 py-[2px] items-baseline">
                    <p className="text-[#605D64] text-base font-medium">MPS</p>
                    <p> </p>
                  </div>
                  <div className="flex gap-2 px-3 py-[2px] items-baseline">
                    <p className="text-[#1C56AC] text-base font-medium">
                      7.24 mm
                    </p>
                    <p className="text-[#605D64] text-xs">1hr</p>
                  </div>
                  <div className="flex gap-2 px-3 py-[2px] items-baseline">
                    <p className="text-[#1C56AC] text-base font-medium">
                      7.24 mm
                    </p>
                    <p className="text-[#605D64] text-xs">4hr</p>
                  </div>
                  <div className="flex gap-2 px-3 py-[2px] items-baseline">
                    <p className="text-[#1C56AC] text-base font-medium">
                      7.24 mm
                    </p>
                    <p className="text-[#605D64] text-xs">8hr</p>
                  </div>
                  <div className="flex gap-2 px-3 py-[2px] items-baseline">
                    <p className="text-[#1C56AC] text-base font-medium">
                      7.24 mm
                    </p>
                    <p className="text-[#605D64] text-xs">24hr</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white flex gap-4 h-full">
                <div className="flex flex-col flex-1 gap-4">
                  <p className="text-[#605D64] font-medium text-base">
                    Size trend
                  </p>
                  <div className={material === "coal" ? "h-[40vh]" : "h-full"}>
                    <LineChart
                      data={Object.values(camData.size)}
                      timeStamps={new Date(
                        camData?.timestamp.split(" ").join("T")
                      ).getTime()}
                      labels={Object.keys(camData.size)}
                      noCoal = {camData.noCoal}
                    />
                  </div>
                </div>
                {material === "coal" && (
                  <>
                    <div className="flex flex-col flex-1 gap-4">
                      <p className="text-[#605D64] font-medium text-base">
                        Color trend
                      </p>
                      <div className="h-[40vh]">
                        <LineChart
                          data={Object.values(camData.color)}
                          timeStamps={new Date(
                            camData?.timestamp.split(" ").join("T")
                          ).getTime()}
                          labels={Object.keys(camData.color)}
                          noCoal = {camData.noCoal}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 gap-4">
                      <p className="text-[#605D64] font-medium text-base">
                        Moisture trend
                      </p>
                      <div className="h-[40vh]">
                        <LineChart
                          data={[camData.moisture]}
                          timeStamps={new Date(
                            camData?.timestamp.split(" ").join("T")
                          ).getTime()}
                          labels={["Moisture"]}
                          noCoal = {camData.noCoal}
                        />
                      </div>
                    </div>
                  </>
                )}
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
