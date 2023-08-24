import { Select, Input } from "@chakra-ui/react";
import FloatingInput from "../SizingUtils/FloatingInput";
import { useState } from "react";

const VideoInputForm = ({setIsVideo}) => {
  const [selectedCam, setSelectedCam] = useState("");
  const cams = [1, 2, 3];
  return (
    <div className="flex flex-col gap-8 w-[24vw] h-full">
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-3 items-start w-full">
          <p className="text-[#938F96] text-sm font-medium">Select a plant</p>
          <div className="w-full">
            <Select
              borderColor="#79767D"
              color="#605D64"
              placeholder="Plant Name"
              variant="outline"
              className="!rounded-[5px] !text-[#AEA9B1] !text-base"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 items-start w-full">
          <p className="text-[#938F96] text-sm font-medium">Select camera</p>
          <div className="grid grid-cols-3 gap-3 w-full">
            {cams.map((id) => {
              return (
                <div
                  key={id}
                  className={`p-2 pl-3 pr-3 text-base border text-[#605D64] rounded-[32px] cursor-pointer ${
                    selectedCam === id ? "border-[#6CA6FC]" : "border-[#EBEBEB]"
                  } ${selectedCam === id ? "bg-[#6CA6FC33]" : "bg-white"}`}
                  onClick={() => setSelectedCam(id)}
                >
                  Camera {id}
                </div>
              );
            })}
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
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 items-start w-full">
          <p className="text-[#938F96] text-sm font-medium">Enter time range</p>
          <div className="flex gap-2 w-full">
            <FloatingInput text="Start time" type="time" />
            <FloatingInput text="End time" type="time" />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="p-[10px] pl-4 pr-4 text-base font-medium text-white bg-[#084298] rounded-[100px]" onClick={()=>setIsVideo(true)}>
          Generate Video
        </button>
      </div>
    </div>
  );
};

export default VideoInputForm;
