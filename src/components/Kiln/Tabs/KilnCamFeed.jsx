import LineChart from "../../Charts/KilnCharts/LineChart";
import WaterfallChart from "../../Charts/KilnCharts/WaterfallChart";
import IndexChart from "../../Charts/KilnCharts/IndexChart";
import { useEffect, useState, useContext } from "react";
import { baseURL } from "../../../index";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import NavContext from "../../NavContext";

const colors = {
  dusty: "#fffcf2",
  healthy: "#DDF7EA",
  hot: "#ffecec",
  hot_Dusty: "#FFEDCC",
  negative: "#F4F4F4",
};

const tagColor = {
  dusty: "#fee179",
  healthy: "#59d79a",
  hot: "#ff6460",
  hot_Dusty: "#ef6f12",
  negative: "#000000",
};

const tagName = {
  dusty: "Dusty",
  healthy: "Healthy",
  hot: "Hot",
  hot_Dusty: "Hot & Dusty",
  negative: "Negative",
};

const KilnCamFeed = ({
  material,
  cameraId,
  clientId,
  callApi,
  initialRender,
  plantName,
}) => {
  let a = 16,
    b = 18;
  const phase = 1;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { auth } = useContext(NavContext);
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
      .post(baseURL + "vision/v2/sizing/analysis/detail/", requestData, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
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
      plantName: plantName,
    });
    const response = await axios
      .post(baseURL + "vision/processMonitoring/feed/detail/", requestData, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
      .then((response) => {
        setBulkData(response.data[cameraId].reverse());
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
      // apiCall();
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
          <div className="flex flex-col xl:flex-row gap-10 bg-white rounded-xl py-4 px-6">
            <div className="flex flex-col gap-8 flex-1">
              <div className="flex justify-between items-center w-full">
                <p className="self-start text-[#3E3C42] text-xl font-medium">
                  Kiln live image
                </p>
                <p className="text-sm text-[#79767D]">
                  {new Date(camData._id.timestamp).toLocaleDateString()}
                  &nbsp;&nbsp;&nbsp;
                  {new Date(camData._id.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full h-[80vh] sm:h-[60vh]">
                <div className="w-full h-[60%] bg-black flex justify-center items-center rounded-lg">
                  <img
                    className="rounded-xl w-auto h-[80%]"
                    src={camData.image_url}
                  />
                </div>
                <div className="h-[40%] gap-4 flex flex-col sm:flex-row w-full items-start sm:items-center justify-between">
                  <div
                    className="py-5 px-5 flex flex-col gap-2 sm:gap-[30px] w-[70vw] sm:w-[45vw] xl:w-[28vw] h-full justify-center rounded"
                    // style={{ backgroundColor: colors[dummy.tag.toLowerCase()] }}
                  >
                    <IndexChart type="Dusty" value={camData.dusty} />
                    <IndexChart type="Hot" value={camData.hot} />
                  </div>
                  <div
                    className="py-5 px-5 flex flex-row sm:flex-col gap-3 items-center sm:items-start rounded self-center"
                    style={{
                      backgroundColor: colors[camData.tag.toLowerCase()],
                    }}
                  >
                    <p className="text-sm text-[#605D64] font-medium">
                      Health:
                    </p>
                    <div className="flex gap-3 items-center">
                      <div
                        className="w-[5px] h-[20px]"
                        style={{
                          backgroundColor: tagColor[camData.tag.toLowerCase()],
                        }}
                      ></div>
                      <p className="text-[#3E3C42] font-medium text-lg">
                        {tagName[camData.tag.toLowerCase()]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 flex-1">
              <p className="self-start text-[#3E3C42] text-xl font-medium">
                Kiln Index Graph
              </p>
              <div className="h-[60vh]">
                <LineChart
                  data={[camData.dusty, camData.hot]}
                  timeStamps={new Date(camData?._id.timestamp).getTime()}
                  labels={["Dusty", "Hot"]}
                  color={["#fee179", "#ff6460"]}
                />
              </div>
            </div>
          </div>
          {phase == 2 && (
            <>
              <div className="flex flex-col lg:flex-row bg-white rounded-xl gap-6 py-4 px-6">
                <div className="flex flex-col gap-8 flex-1">
                  <p className="self-start text-[#3E3C42] text-xl font-medium">
                    Burning Zone Temperature
                  </p>
                  <div className="h-[40vh]">
                    <LineChart />
                  </div>
                </div>
                <div className="flex flex-col gap-8 flex-1">
                  <p className="self-start text-[#3E3C42] text-xl font-medium">
                    C3S Quality
                  </p>
                  <div className="h-[40vh]">
                    <LineChart />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 bg-white rounded-xl py-4 px-6">
                <p className="self-start text-[#3E3C42] text-xl font-medium">
                  RCA of Kiln Index
                </p>
                <div className="h-[50vh]">
                  <WaterfallChart />
                </div>
              </div>
              <div className="flex flex-col bg-white rounded-xl gap-5 py-4 px-6">
                <div className="flex flex-col gap-2">
                  <p className="self-start text-[#3E3C42] text-xl font-medium">
                    Recommendation
                  </p>
                  <div className="flex gap-8">
                    <div className="flex gap-2">
                      <svg
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="7" cy="7.26758" r="7" fill="#6CA6FC" />
                      </svg>
                      <p className="text-xs text-[#79767D]">
                        {"Current value (C)"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <svg
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="7" cy="7.26758" r="7" fill="#16FCD2" />
                      </svg>
                      <p className="text-xs text-[#79767D]">
                        {"Current value (C)"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-4 justify-end">
                    <div className="flex flex-col gap-4 w-full h-[56px] text-[#79767D] text-xs">
                      <p>{"(C)"}</p>
                      <p>{"(R)"}</p>
                    </div>
                  </div>
                  <div className="flex gap-8 overflow-x-auto flex-1">
                    {arr.map((i) => {
                      return (
                        <div className="flex flex-1 flex-col gap-4 min-w-[95px]">
                          <p className="text-[#605D64] text-base font-medium">
                            SAT
                          </p>
                          <div className="flex flex-col gap-4 w-full text-sm h-[56px]">
                            <div
                              style={{
                                width:
                                  a < b
                                    ? `${Math.ceil((a / b) * 100)}%`
                                    : "100%",
                              }}
                              className="bg-[#6CA6FC] text-white rounded-r-[5px] h-full"
                            >
                              {a}
                            </div>
                            <div
                              style={{
                                width:
                                  b < a
                                    ? `${Math.ceil((b / a) * 100)}%`
                                    : "100%",
                              }}
                              className="bg-[#16FCD2] text-[#3E3E3E] rounded-r-[5px] h-full"
                            >
                              {b}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
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

export default KilnCamFeed;
