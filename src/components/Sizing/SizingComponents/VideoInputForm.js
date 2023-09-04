import { Select, Input } from "@chakra-ui/react";
import FloatingInput from "../SizingUtils/FloatingInput";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VideoInputForm = ({
  setIsVideo,
  plantId,
  cameraId,
  disable,
  plantCamMap,
}) => {
  const param = useParams();
  const [selectedPlant, setSelectedPlant] = useState(disable ? plantId : "select plant");
  const [selectedCam, setSelectedCam] = useState(cameraId);
  const [date, setDate] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());

  const apiCall = async () => {
    const requestData = JSON.stringify({
      plantId: selectedPlant,
      cameraId: selectedCam,
      startTime: new Date(date + "T" + fromTime).getTime(),
      endTime: new Date(date + "T" + toTime).getTime(),
      clientId: param.clientId.toLowerCase(),
      material: param.material.toLowerCase(),
    });
    const response = await axios
      .post(
        "https://intelliverse.backend-ripik.com/vision/v1/sizing/getFeedLibrary/video/",
        requestData,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setIsVideo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () =>{
    apiCall();
  }

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
              <option value='select plant'>select plant</option>
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
            />
            <FloatingInput
              text="End time"
              type="time"
              setDateTime={setToTime}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="p-[10px] pl-4 pr-4 text-base font-medium text-white bg-[#084298] rounded-[100px]"
          onClick={handleSubmit}
        >
          Generate Video
        </button>
      </div>
    </div>
  );
};

export default VideoInputForm;
