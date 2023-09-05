import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Pichart = ({
  topText,
  topTextvalue,
  option,
  series,
  bottomText,
  bottomTextvalue,
  wid,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const flexDirection = windowWidth < 980 ? "flex-col" : "flex-row";

  return (
    <div
      className={` flex flex-col items-center  w-[18vw]   h-auto  gap-[28px] flex-shrink-0 rounded-[12px] `}
    >
      {/* top text */}
      <div className="flex flex-col gap-[6px] text-left">
        <div className=" text-[#525056] text-[16px]  font-medium  ">
          {topText}
        </div>
        <div className="text-orange-500  font-medium ">{topTextvalue}</div>
      </div>
      {/* pi chart */}

      <div id="chart">
        <ReactApexChart
          options={option}
          series={series}
          type="pie"
          width={"110%"}
        />
      </div>

      {/* svg and text */}
      <div className="flex gap-[8px] text-left w-[80%]">
        {/* svg div */}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewdiv="0 0 12 12"
            fill="none"
          >
            <circle cx="6" cy="6" r="6" fill="#938F96" />
          </svg>
        </div>
        {/* text div */}
        <div className="text-start text-left  mt-[-5px]">
          <div className="text-[#938F96] text-neutral-n-60 font-roboto text-base">
            {bottomText}
          </div>
          <div className="text-[#938F96] text-neutral-n-60 font-roboto text-base font-medium">
            {bottomTextvalue}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pichart;
