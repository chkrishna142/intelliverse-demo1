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
};

const Capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

const FeedCard = ({ parameter, reasons }) => {
  const urls = [
    "/WorkforceSafetyIcons/tick.svg",
    "/WorkforceSafetyIcons/alert.svg",
  ];
  const [bgColor, setBgColor] = useState("#CDEEBF");

  useEffect(() => {
    let flag = false;
    Object.keys(reasons).map((val) => {
      if (reasons[val] == 1) {
        flag = true;
      }
    });
    if (flag) setBgColor("#EC928E");
    else setBgColor("#CDEEBF");
  }, [reasons]);

  return (
    <div className="flex flex-col gap-0 w-full h-[250px] shadow-md rounded-lg">
      <div
        className="py-4 pl-4 text-[#525056] text-base font-medium w-full rounded-t-lg"
        style={{ backgroundColor: bgColor }}
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
            <img src={`/WorkforceSafetyIcons/${iconMap[val]}`} />
            <div className="py-[10px] px-4 flex justify-between items-center w-full">
              <p className="text-[#79767D] text-base">{Capitalize(val)}</p>
              {reasons[val] != -1 ? (
                <img src={urls[reasons[val]]} />
              ) : (
                <p className="text-[#79767D] text-base">-</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeedCard;
