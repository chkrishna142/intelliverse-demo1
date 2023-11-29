import { useState } from "react";
import StatusTable from "../Tables/StatusTable";

const Status = () => {
  const [sm, setSm] = useState(1);
  const [type, setType] = useState("hopper");
  const batches = [1, 3];
  const types = ["hopper", "loader"];
  let active = Math.floor(Math.random() * 3);
  return (
    <div className="flex flex-col gap-3 pb-6 pt-3 px-3 rounded-xl bg-white">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            {batches.map((i, idx) => {
              return (
                <div
                  className="py-[6px] px-3 rounded border text-sm"
                  style={{
                    backgroundColor: sm == i ? "#f1f7ff" : "white",
                    color: sm == i ? "#3E3C42" : "#605D64",
                    borderColor: sm == i ? "#6CA6FC" : "#EBEBEB",
                    cursor: sm == i ? "" : "pointer",
                    fontWeight: sm == i ? 500 : 400,
                  }}
                  onClick={() => setSm(i)}
                >
                  SM {i}
                </div>
              );
            })}
          </div>
          <div className="flex gap-8 items-center">
            <div className="flex flex-col gap-1">
              <p className="text-[#3A74CA] text-base font-medium">CU 1</p>
              <p className="text-[#AEA9B1] text-sm">Plant</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[#3A74CA] text-base font-medium">A</p>
              <p className="text-[#AEA9B1] text-sm">Shift</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[#3A74CA] text-base font-medium">26</p>
              <p className="text-[#AEA9B1] text-sm">Batch</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[#938F96] text-sm font-medium flex gap-3">12 May ‘23 <span>12:45 pm</span></p>
              <p className="text-[#AEA9B1] text-sm">Time</p>
            </div>
          </div>
        </div>
        <div className="flex ga-0">
          {types.map((i, idx) => {
            return (
              <div
                className={`py-[6px] px-3 capitalize border text-sm ${
                  idx == 0 ? "rounded-l" : "rounded-r"
                }`}
                style={{
                  backgroundColor: type == i ? "#FFFFED" : "white",
                  borderColor: type == i ? "#FFC107" : "#EBEBEB",
                  color: type == i ? "#3E3C42" : "#605D64",
                  fontWeight: type == i ? 500 : 400,
                  cursor: type == i ? "" : "pointer",
                }}
                onClick={() => setType(i)}
              >
                {i}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-3">
        <StatusTable />
        <div className="flex flex-col gap-4 w-[30%] h-[100vh] overflow-y-auto">
          {[...Array(3)].map((i, idx) => {
            return (
              <div className="flex flex-col gap-2 capitalize">
                <p>{type + " " + (idx + 1)}</p>
                <div className="w-full h-full bg-black rounded flex justify-center items-center relative">
                  <img
                    src="https://media.istockphoto.com/id/1283895179/photo/jcb-crane-working-near-sand-quarry.jpg?s=612x612&w=0&k=20&c=DAESMJ9vd1vzUW1JznFoWBSkdZkBUSTM5zyTZPCzLHs="
                    alt="no support"
                    className="w-full h-auto rounded"
                  />
                  {active == idx && (
                    <div className="flex gap-[5px] absolute top-2 right-3 rounded px-1 bg-[#DC362E] items-center text-[#FAFAFA] text-xs font-medium h-[24px]">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="4" cy="4" r="4" fill="white" />
                      </svg>

                      <p>Active</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Status;
