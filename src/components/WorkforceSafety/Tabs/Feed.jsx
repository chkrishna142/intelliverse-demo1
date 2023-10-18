import { useState, useEffect, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import NavContext from "../../NavContext";
import { baseURL } from "../../../index";
import FeedCard from "../Components/FeedCard";
import axios from "axios";

const playNotificationSound = (toast, check, title) => {
  console.log("playing...");

  const audio = new Audio(
    "https://drive.google.com/uc?id=1q5E3cd0B8L1z89ojBex3ZzNxDakk1ilG&export=download"
  );

  const playPromise = audio.play();
  audio.volume = 0.02;
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("Audio playback started successfully.");
        toast({
          title: title,
          description: Object.keys(check)[0] + " not detected",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((error) => {
        console.error("Error starting audio playback:", error);
      });
  }
};

const Feed = () => {
  const [selectedBay, setSelectedBay] = useState();
  const param = useParams();
  const [bays, setBays] = useState([]);
  const [currentCams, setCurrentCams] = useState({});
  const { auth } = useContext(NavContext);
  const toast = useToast();

  const LiveAlertsApi = async () => {
    const requestData = JSON.stringify({
      clientId: param.clientId.toLowerCase(),
      useCase: param.material.toUpperCase(),
      plantName: "khandala",
      bayId: "bay1",
    });
    const response = await axios
      .post(
        baseURL + "vision/v1/workforceMonitoring/alerts/live/",
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
        let data = response.data.alerts;
        if (data && Object.keys(data).length > 0) {
          Object.keys(data).map((title) => {
            data[title].map((check, idx) => {
              playNotificationSound(toast, check, title);
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const BaysApiCall = async () => {
    const requestData = JSON.stringify({
      clientId: param.clientId.toLowerCase(),
      useCase: param.material.toUpperCase(),
      plantName: "khandala",
      bayId: "all",
    });
    const response = await axios
      .post(
        baseURL + "vision/v1/workforceMonitoring/info/cameraList/",
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
        let data = response.data.bays;
        let totalbays = [];
        let bayCamMap = {};
        data.map((item) => {
          totalbays.push(item.bayId);
          bayCamMap[item.bayId] = item.cameraInfo;
        });
        setBays(totalbays);
        setCurrentCams(bayCamMap);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      LiveAlertsApi();
    }, 20 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    BaysApiCall();
  }, []);

  useEffect(() => {
    if (bays.length > 0) {
      setSelectedBay(bays[0]);
    }
  }, [bays]);

  const entries = [
    "Clamp and Chock",
    "Safety",
    "Dip rod test",
    "Flushing",
    "Sampling",
    "Lids closed",
  ];

  const reasons = [
    ["Chock", "Clamp"],
    ["Helmet", "Rope", "Harness"],
    ["Executive", "Security", "Rod Dip"],
    ["Flushing"],
    ["Executive", "Sampling"],
    ["Compartment", "Port"],
  ];

  const codes = [[1, 0], [0, 1, 1], [0, 1, 1], [0], [0, 0], [1, 0]];
  const bgcode = [1, 1, 1, 0, 0, 1];

  const cams = [
    "Camera 1",
    "Camera - SAMPLING BACK SIDE 01 & 02",
    "Camera - Sampling vehicle number",
    "Camera 1",
    "Camera - SAMPLING BACK SIDE 01 & 02",
    "Camera - Sampling vehicle number",
  ];

  const imgs = ["3.png", "2.png", "1.png", "3.png", "2.png", "1.png"];

  return (
    <div className="px-6 py-4 rounded-xl bg-white flex flex-col gap-5">
      <div className="flex items-center gap-7">
        <p className="text-xl font-medium text-[#3E3C42]">Khandala</p>
        <div className="flex gap-4 items-center">
          {bays.map((val) => {
            return (
              <div
                className={`rounded-[32px] px-4 py-[6px] text-[#605D64] text-base cursor-pointer ${
                  selectedBay != val
                    ? "bg-white border border-gray-300"
                    : "bg-[#e2edfe] border border-[#6CA6FC]"
                }`}
                onClick={() => setSelectedBay(val)}
              >
                {val}
              </div>
            );
          })}
        </div>
      </div>
      <div className="self-start px-6 py-3 flex gap-7 items-center bg-[#FAFAFA] rounded-[6px] border border-[#EBEBEB]">
        <div className="flex gap-2 items-center">
          <p className="text-sm text-[#605D64]">Truck no.</p>
          <p className="text-base font-medium text-[#3E3C42]">18002341</p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-[#605D64]">In Time</p>
          <p className="text-base font-medium text-[#3E3C42]">11:12:34</p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-[#605D64]">Date</p>
          <p className="text-base font-medium text-[#3E3C42]">10-10-2021</p>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="grid grid-cols-3 gap-4 h-[60%] w-full">
          {entries.map((val, idx) => {
            return (
              <FeedCard
                parameter={val}
                reasons={reasons[idx]}
                codes={codes[idx]}
                bgcode={bgcode[idx]}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-4 py-4 pr-6 pl-4 rounded-lg bg-[#F5F5F5] h-[100vh] w-[45vw] overflow-y-auto">
          {currentCams.hasOwnProperty(selectedBay) &&
            currentCams[selectedBay].map((val, idx) => {
              return (
                <div className="flex-1 flex flex-col gap-2 w-full">
                  <p className="text-[#605D64] text-sm font-medium whitespace-nowrap">
                    {val.cameraId}
                  </p>
                  <div className="relative bg-black h-full w-full flex justify-center items-center rounded-xl">
                    <img
                      className="w-[40vw] rounded-xl"
                      src={`/WorkforceSafetyIcons/images/${imgs[idx]}`}
                    />
                    <div className="absolute bottom-2 right-2 bg-black rounded-md opacity-70 p-[2px]">
                      <p className="text-white text-xs font-semibold bg-black rounded-lg">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black rounded-md opacity-70 p-[2px]">
                      <p className="text-white text-xs font-semibold bg-black rounded-lg">
                        {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
