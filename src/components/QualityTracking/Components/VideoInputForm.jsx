import { Select, Input, Spinner } from "@chakra-ui/react";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { useState, useContext } from "react";
import NavContext from "../../NavContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { baseURL } from "../../../index";

const VideoInputForm = ({
  setIsVideo,
  plantId,
  cameraId,
  disable,
  plantCamMap,
}) => {
  const param = useParams();
  const { auth } = useContext(NavContext);
  const [selectedPlant, setSelectedPlant] = useState(
    disable ? plantId : "select plant"
  );
  const [videoLoading, setVideoLoading] = useState(false);
  const [selectedCam, setSelectedCam] = useState(cameraId);
  const [date, setDate] = useState(new Date());
  const [toTime, setToTime] = useState("00:00");
  const [fromTime, setFromTime] = useState("00:00");
  const toast = useToast();

  const apiCall = async () => {
    const requestData = JSON.stringify({
      plantName: selectedPlant,
      cameraId: selectedCam,
      startDate:new Date(date + "T" + fromTime).getTime() + 5.5 * 60 * 60 * 1000,
      endDate: new Date(date + "T" + toTime).getTime() + 5.5 * 60 * 60 * 1000,
      clientId: param.clientId.toLowerCase(),
      useCase: param.material.toUpperCase(),
    });
    const response = await axios
      .post(
        baseURL + "vision/v2/qualityTracking/feedLibrary/video/",
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
        setIsVideo(response.data.url);
        toast({
          position: "top-right",
          title: !response.data.success ? "Failed" : "Video loaded",
          description:
            !response.data.success
              ? "No video in range"
              : "Video is ready to play",
          status: !response.data.success ? "error" : "success",
          duration: 3000,
          isClosable: true,
        });
        setVideoLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    setVideoLoading(true);
    setIsVideo("");
    apiCall();
  };

  return (
    <div className="flex flex-col gap-8 w-[24vw] min-w-[245px] h-full">
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-3 items-start w-full">
          <p className="text-[#938F96] text-sm font-medium">Select a plant</p>
          <div className="w-full">
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              placeholder={disable && selectedPlant}
              variant="outline"
              isDisabled={disable}
              className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
              onChange={(e) => setSelectedPlant(e.target.value)}
              value={selectedPlant}
            >
              <option value="select plant">select plant</option>
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
        </div>
        <div className="flex flex-col gap-3 items-start w-full">
          <p className="text-[#938F96] text-sm font-medium">Select camera</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 w-full overflow-y-auto h-[45px]">
            {!disable && selectedPlant !== "select plant"
              ? plantCamMap[selectedPlant].map((id) => {
                  return (
                    <div
                      key={id}
                      className={`p-2 pl-3 pr-3 text-base text-center border text-[#605D64] rounded-[32px] cursor-pointer ${
                        selectedCam === id
                          ? "border-[#6CA6FC]"
                          : "border-[#EBEBEB]"
                      } ${selectedCam === id ? "bg-[#6CA6FC33]" : "bg-white"}`}
                      onClick={() => setSelectedCam(id)}
                    >
                      {id}
                    </div>
                  );
                })
              : disable && (
                  <div className="p-2 pl-3 pr-3 text-base text-center border text-[#605D64] rounded-[32px] cursor-pointer bg-[#6CA6FC33] border-[#6CA6FC]">
                    {selectedCam}
                  </div>
                )}
          </div>
        </div>
        <div className="flex flex-col gap-3 items-start w-full">
          <p className="text-[#938F96] text-sm font-medium">Enter date</p>
          <div className="w-full">
            <Input
              borderColor="#79767D"
              color="#605D64"
              type="date"
              placeholder="Select Date"
              variant="outline"
              className="!rounded-[5px] !text-[#AEA9B1] !text-base"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 items-start w-full">
          <p className="text-[#938F96] text-sm font-medium">Enter time range</p>
          <div className="flex gap-2 w-full">
            <FloatingInput
              text="Start time"
              type="time"
              setDateTime={setFromTime}
              value={fromTime}
            />
            <FloatingInput
              text="End time"
              type="time"
              setDateTime={setToTime}
              value={toTime}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="p-[10px] pl-4 pr-4 text-base font-medium text-white bg-[#084298] rounded-[100px]"
          onClick={handleSubmit}
        >
          {videoLoading ? <Spinner /> : "Generate Video"}
        </button>
      </div>
    </div>
  );
};

export default VideoInputForm;