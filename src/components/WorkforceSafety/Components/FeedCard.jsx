import { useEffect, useState } from "react";

const iconMap = {
  wheelChock: "chock.svg",
  earthingClamp: "clamp.svg",
  helmet: "helmet.svg",
  rope: "rope.svg",
  harness: "harness.svg",
  executive: "executive.svg",
  security: "security.svg",
  rodDip: "rod.svg",
  flush: "flushing.svg",
  sampling: "sampling.svg",
  compartment: "compartment.svg",
  port: "port.svg",
  sampleCollection: "samplerContainer.svg",
  inspected: "executive.svg",
  drained: "drained.svg",
  collected: "samplerContainer.svg",
};

const Capitalize = (str) => {
  const arr = str.split("");
  let str2 = "";
  for (var i = 0; i < arr.length; i++) {
    str2 += arr[i] == arr[i].toUpperCase() ? " " + arr[i] : arr[i];
  }
  return str2;
};

const urls = [
  "/WorkforceSafetyIcons/tick.svg",
  "/WorkforceSafetyIcons/alert.svg",
];

const BgColorHandler = (data) => {
  return Object.values(data).some((reason) => reason === 1);
};

const FeedCard = ({ parameter, reasons }) => {
  return (
    <div className="flex flex-col gap-0 w-full h-[250px] shadow-md rounded-lg">
      <div
        className="py-4 pl-4 text-[#525056] text-base font-medium w-full rounded-t-lg capitalize"
        style={{
          backgroundColor: BgColorHandler(reasons) ? "#EC928E" : "#CDEEBF",
        }}
      >
        {Capitalize(parameter)}
      </div>
      {Object.keys(reasons).map((val, idx) => {
        return (
          <div
            className={`pt-3 pl-3 flex items-center rounded ${
              reasons[val] == 1 ? "border-2 border-[#E46962]" : "border-0"
            }`}
          >
            <img
              className="h-[50px] w-[50px]"
              src={`/WorkforceSafetyIcons/${iconMap[val]}`}
            />
            <div className="py-[10px] px-4 flex justify-between items-center w-full">
              <p className="text-[#79767D] text-base capitalize">
                {Capitalize(val)}
              </p>
              {reasons[val] != -1 ? (
                <img src={urls[reasons[val]]} />
              ) : (
                <div className="flex">
                  <div className="animate-beatloader-item animate-delay-0"></div>
                  <div className="animate-beatloader-item animate-delay-1000"></div>
                  <div className="animate-beatloader-item animate-delay-2000"></div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeedCard;
