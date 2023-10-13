import LineChart from "../../Charts/KilnCharts/LineChart";
import IndexChart from "../../Charts/SinterFlameCharts/IndexChart";
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
      clientId: "ultratech",
      material: "kilnhealth",
      cameraId: "jaffrabad1",
      plantName: "jaffrabad",
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
        setCamData(response.data['jaffrabad1']);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const apiCallPopulate = async () => {
    const requestData = JSON.stringify({
      clientId: "ultratech",
      material: "kilnhealth",
      cameraId: "jaffrabad1",
      plantName: "jaffrabad",
    });
    const response = await axios
      .post(baseURL + "vision/processMonitoring/feed/list/", requestData, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
      .then((response) => {
        setBulkData(response.data['jaffrabad1'].reverse());
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
                  {new Date(camData.created).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                  &nbsp;&nbsp;&nbsp;
                  {new Date(camData.created).toLocaleTimeString()}
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
                    <IndexChart type="Flame" value={camData.dusty} />
                    {/* <IndexChart type="Hot" value={camData.hot} /> */}
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
                Trend Analysis
              </p>
              <div className="h-[60vh]">
                <LineChart
                  data={[camData.dusty]}
                  timeStamps={new Date(camData?.created).getTime()}
                  labels={["Index"]}
                  color={["#fee179"]}
                />
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
