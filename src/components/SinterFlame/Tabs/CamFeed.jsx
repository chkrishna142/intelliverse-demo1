import IndexChart from "../../Charts/SinterFlameCharts/IndexChart";
import { useEffect, useState, useContext } from "react";
import { baseURL } from "../../../index";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import NavContext from "../../NavContext";
import ColorBarChart from "../../Charts/SinterFlameCharts/ColorBarChart";
import LineChart from "../../Charts/SinterFlameCharts/LineChart";

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

const CamFeed = ({
  material,
  cameraId,
  clientId,
  callApi,
  initialRender,
  plantName,
}) => {
  const { auth } = useContext(NavContext);
  const [camData, setCamData] = useState("");
  const [bulkData, setBulkData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      useCase: material.toUpperCase(),
      cameraId: cameraId,
      // plantName: plantName,
    });
    const response = await axios
      .post(
        baseURL + "vision/v2/processMonitoring/analysis/detail/",
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
      // plantName: plantName,
    });
    const response = await axios
      .post(
        baseURL + "vision/v2/processMonitoring/analysis/list/",
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
          <div className="flex flex-col xl:flex-row gap-10 bg-white rounded-xl py-4 px-6">
            <div className="flex flex-col gap-8 flex-1">
              <div className="flex justify-between items-center w-full">
                <p className="self-start text-[#3E3C42] text-xl font-medium">
                  Current Analysis
                </p>
                <p className="text-sm text-[#79767D]">
                  {new Date(camData.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                  &nbsp;&nbsp;&nbsp;
                  {new Date(camData.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full h-[80vh] sm:h-[60vh]">
                <div className="w-full h-full sm:h-[70%] bg-black flex justify-center items-center rounded-lg">
                  <img
                    className="rounded-xl w-auto h-[30vh]"
                    src={camData.annotatedImage}
                  />
                </div>
                {!(camData.flags.viewObstructed || camData.flags.flapClosed) ? (
                  <div className="h-[150px] sm:h-[30%] gap-4 flex flex-col sm:flex-row w-full items-start sm:items-center justify-between">
                    <div className="py-5 px-5 flex flex-col gap-2 sm:gap-[30px] w-[85vw] xl:w-[40vw] h-full justify-center items-center rounded">
                      <p className="self-start text-sm text-[#605D64] font-medium whitespace-nowrap">
                        Health Index:
                      </p>
                      <IndexChart accuracy={camData?.conf?.toFixed(0)} value={camData.healthIndex} />
                    </div>
                    {/* <div
                      className="py-5 px-5 flex flex-row sm:flex-col gap-3 items-center sm:items-start rounded self-start sm:self-center"
                      style={{
                        backgroundColor: `rgb(${camData.rgb.r},${camData.rgb.g},${camData.rgb.b},0.6)`,
                      }}
                    >
                      <p className="text-sm text-[#605D64] font-medium">RGB</p>
                      <p className="text-[#3E3C42] font-medium text-lg whitespace-nowrap">
                        {"( " +
                          camData.rgb.r +
                          "," +
                          camData.rgb.g +
                          "," +
                          camData.rgb.b +
                          " )"}
                      </p>
                    </div> */}
                  </div>
                ) : (
                  <div className="h-[40%] gap-4 flex flex-row w-full items-center justify-center text-black font-bold text-center text-2xl">
                    <img
                      src="/SinterflameIcons/viewObstruct.svg"
                      className="h-[10vh]"
                    />
                    <p>View Obstructed</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-8 flex-1">
              <p className="self-start text-[#3E3C42] text-xl font-medium">
                Trend Analysis
              </p>
              <div className="h-[60vh]">
                <LineChart
                  data={[camData.healthIndex]}
                  timeStamps={new Date(camData?.timestamp).getTime()}
                  labels={["healthIndex"]}
                  color={["#fee179"]}
                />
                {/* <ColorBarChart
                    timeStamps={new Date(camData?.timestamp).getTime()}
                    rgb={camData.rgb}
                  /> */}
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
