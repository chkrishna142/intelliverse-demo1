import { useState } from "react";
import FeedCard from "../Components/FeedCard";

const Feed = () => {
  const [selectedBay, setSelectedBay] = useState(1);
  const bays = [1, 2, 3, 4];

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
    "Camera - Sampling backside 3&4",
    "Camera - Sampling vehicle number",
    "Camera 1",
    "Camera - Sampling backside 3&4",
    "Camera - Sampling vehicle number",
  ];

  return (
    <div className="px-6 py-4 rounded-xl bg-white flex flex-col gap-5">
      <div className="flex flex-col gap-3">
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
                {"Bay " + val}
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
        <div className="grid grid-cols-3 gap-4 h-[60%] w-[60%]">
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
        <div className="flex flex-col gap-4 py-4 pr-6 pl-4 rounded-lg bg-[#F5F5F5] h-[750px] overflow-y-auto">
          {cams.map((val) => {
            return (
              <div className="flex flex-col gap-2 w-[40%]">
                <p className="text-[#605D64] text-sm font-medium whitespace-nowrap">
                  {val}
                </p>
                <div className="relative bg-black h-[200px] w-[400px] flex justify-center items-center rounded-xl">
                  <img
                    className="h-[200px] rounded-xl"
                    src="https://img.freepik.com/free-photo/workers-examining-work_1122-970.jpg?1"
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
