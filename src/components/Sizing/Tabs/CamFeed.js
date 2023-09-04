import axios from "axios";
import { useState, useEffect } from "react";
import LineChart from "../../Charts/SizingCharts/LineCharts";
import DonutChart from "../../Charts/SizingCharts/DonutChart";
import LiquidGauge from "../../Charts/SizingCharts/LiquidGauge";

const CamFeed = ({ material, cameraId, clientId }) => {
  const [camData, setCamData] = useState("");

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
        setCamData(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    apiCall();
    const intervalId = setInterval(() => {
      apiCall();
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    camData && (
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-6 rounded-xl p-4 pr-6 pl-6 bg-white">
          <div className="flex flex-col gap-2 items-center w-full">
            <p className="self-start text-[#3E3C42] text-sm">Original Image</p>
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
            <div className="flex flex-col items-center justify-center">
              <p>No {material} on Belt</p>
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
            <div className="flex flex-col items-center justify-center">
              <p>No {material} on Belt</p>
            </div>
          )}
        </div>
        <div
          className={material === "coal" ? "flex flex-col gap-2" : "flex gap-2"}
        >
          <div className="flex flex-col gap-4 rounded-xl p-6 pt-4 bg-white">
            <p className="text-[#3E3C42] text-xl font-medium">
              Current analysis
            </p>
            <div
              className={
                material === "coal"
                  ? "flex gap-[64px]"
                  : "flex flex-col-reverse gap-4"
              }
            >
              {camData.noCoal === 0 ? (
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
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <p>No {material} on Belt</p>
                </div>
              )}
              {material === "coal" &&
                (camData.noCoal === 0 ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-base font-medium text-[#605D64]">
                      Color Distribution
                    </p>
                    <div className="h-full w-[6vw] flex flex-col gap-1">
                      <div
                        style={{ height: `${camData.color.gray}%` }}
                        className="bg-[#79767D] rounded-tr-lg rounded-tl-lg text-white text-center text-lg font-medium"
                      >
                        {camData.color.gray}%
                      </div>
                      <div
                        style={{ height: `${camData.color.black}%` }}
                        className="bg-black rounded-br-lg rounded-bl-lg text-white text-center text-lg font-medium"
                      >
                        {camData.color.black}%
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <p>No {material} on Belt</p>
                  </div>
                ))}
              {material === "coal" &&
                (camData.noCoal === 0 ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-base font-medium text-[#605D64]">
                      Moisture Content
                    </p>
                    <div className="">
                      <LiquidGauge moisture={camData.moisture} r={100} />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <p>No {material} on Belt</p>
                  </div>
                ))}
              {camData.noCoal === 0 ? (
                <div className="flex flex-col gap-4">
                  <p className="text-base font-medium text-[#605D64]">MPS</p>
                  <div className="rounded-lg bg-[#f6faff] text-center py-[25px] pl-3 pr-7 text-[#1C56AC] text-2xl">
                    {camData.mps.toFixed(2)} mm
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <p>No {material} on Belt</p>
                </div>
              )}
            </div>
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
              {camData.noCoal === 0 ? (
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
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col flex-1 items-center justify-center">
                  <p>No {material} on Belt</p>
                </div>
              )}
              {material === "coal" && (
                <>
                  {camData.noCoal === 0 ? (
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
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col flex-1 items-center justify-center">
                      <p>No {material} on Belt</p>
                    </div>
                  )}
                  {camData.noCoal === 0 ? (
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
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col flex-1 items-center justify-center">
                      <p>No {material} on Belt</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CamFeed;
