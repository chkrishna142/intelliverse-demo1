import axios from "axios";
import { useState, useEffect } from "react";
import LineChart from "../../Charts/SizingCharts/LineCharts";
import DonutChart from "../../Charts/SizingCharts/DonutChart";

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
    <div className="flex flex-col gap-6">
      <div className="rounded-xl bg-white flex justify-between gap-6 p-3">
        <div className="flex flex-col items-center w-[20vw]">
          <p className="self-start">Original Image</p>
          <img className="rounded-lg" src={camData.originalImage} />
        </div>
        {camData && camData.noCoal !== 1 ? (
          <div className="flex flex-col items-center w-[20vw]">
            <p className="self-start">Perspective Image</p>
            <img className="rounded-lg" src={camData.perspectiveImage} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-[20vw]">
            <p>No {material} on Belt</p>
          </div>
        )}
        {camData && camData.noCoal !== 1 ? (
          <div className="flex flex-col items-center w-[20vw]">
            <p className="self-start">Grid Image</p>
            <img className="rounded-lg" src={camData.particleImage} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-[20vw]">
            <p>No {material} on Belt</p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-black font-bold text-xl">Current analysis</p>
        <div className="rounded-xl bg-white flex gap-6 w-[85vw] h-[30vh] p-3">
          {camData && camData.noCoal !== 1 ? (
            <div className="flex flex-col flex-1 gap-4 justify-center">
              <DonutChart
                data={Object.values(camData.size)}
                labels={Object.keys(camData.size)}
              />
            </div>
          ) : (
            <div className="flex flex-col flex-1 items-center justify-center">
              <p>No {material} on Belt</p>
            </div>
          )}
          {camData && camData.noCoal !== 1 && material!=="coal" ? (
            <div className="flex flex-col flex-1 gap-4 justify-center">
              <div className="flex justify-center">
                <div className="rounded-xl bg-green-400 p-[50px] text-white font-semibold text-4xl text-center">
                  MPS: {camData.mps.toFixed(2)}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 items-center justify-center">
              <p>No {material} on Belt</p>
            </div>
          )}
          {camData && camData.noCoal !== 1 && material!=="coal" ? (
            <div className="flex flex-col flex-1 gap-4 justify-center">
              <div className="flex justify-center">
                <div className="rounded-xl bg-green-400 p-[30px] text-white font-semibold text-4xl text-center">
                  Minute Average: {camData.minuteAverage.toFixed(2)}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 items-center justify-center">
              <p>No {material} on Belt</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-black font-bold text-xl">Trend analysis</p>
        <div className="rounded-xl bg-white flex gap-6 w-[85vw] p-3">
          {camData && camData.noCoal !== 1 ? (
            <div className="flex flex-col flex-1 gap-4">
              <p className="font-bold text-sm">Size Bin Chart</p>
              <div className="h-[40vh]">
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
          {camData && camData.noCoal !== 1 && material !== "coal"? (
            <div className="flex flex-col flex-1 gap-4">
              <p className="font-bold text-sm">MPS Chart</p>
              <div className="h-[40vh]">
                <LineChart
                  data={[camData.mps]}
                  timeStamps={new Date(
                    camData?.timestamp.split(" ").join("T")
                  ).getTime()}
                  labels={["mps"]}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 items-center justify-center">
              <p>No {material} on Belt</p>
            </div>
          )}
          {camData && camData.noCoal !== 1 && material !== "coal"? (
            <div className="flex flex-col flex-1 gap-4">
              <p className="font-bold text-sm">Minute Average Chart</p>
              <div className="h-[40vh]">
                <LineChart
                  data={[camData.minuteAverage]}
                  timeStamps={new Date(
                    camData?.timestamp.split(" ").join("T")
                  ).getTime()}
                  labels={["minuteAverage"]}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 items-center justify-center">
              <p>No {material} on Belt</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CamFeed;
