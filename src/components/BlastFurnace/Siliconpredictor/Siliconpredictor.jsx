import { useState } from "react";
import Linechart from "../../Charts/BF_Charts/Linechart";
import RcawaterfallChart from "../../Charts/BF_Charts/RcawaterfallChart";
import { useWindowSize } from "@uidotdev/usehooks";

const Siliconpredictor = () => {
  const size = useWindowSize();
  const [isExpanded1, setIsExpanded1] = useState(true);
  const [isExpanded4, setIsExpanded4] = useState(true);

  const [fuelchart, setFuelchart] = useState({
    series: [
      {
        name: "Current value",
        data: [411, 380, 410, 425, 410, 380, 410],
      },
      {
        name: "Predictive value",
        data: [455, 455, 455, 455, 455, 455, 455],
      },
      {
        name: " Ideal Upper/Lower limit",
        data: [431, 410, 440, 455, 440, 410, 440],
      },
    ],

    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
      //   colors: ["#69B04B", "#545454","#16FCD2"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      grid: {
        borderColor: "#e7e7e7",
        strokeDashArray: 5,
        padding: {
          top: 0,
          right: 30,
          bottom: 0,
          left: 30,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [
          "11 pm",
          "11:10 pm",
          "11:20 pm",
          "11:30 pm",
          "11:40 pm",
          "11:50 pm",
          "12 pm",
        ],
        // title: {
        //   text: "Month",
        // },
      },
      yaxis: {
        // title: {
        //   text: "Temperature",
        // },
        // min: 500,
        // max: 550,
      },
      colors: ["#69B04B", "#525056", "#16FCD2"], // Set the colors for the first and second series

      dataLabels: {
        enabled: [true, false], // Enable for Series 1, disable for Series 2
        enabledOnSeries: [0],
        style: {
          fontSize: 12,
        },
        background: {
          enabled: true,
        },
      },
      stroke: {
        curve: "straight",
        width: [1, 1],
        // width: [1, 3, 3, 1],
        dashArray: [0, 6],
      },
      legend: {
        show: false,
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  const series = [
    {
      data: [
        {
          x: "Current Value",
          y: [15, 25],
          fillColor: "#FFC107",
        },
        {
          x: "Heart", // First instance of Oxygen Enrichment
          y: [25, 45],
          seriesIndex: 1, // Unique identifier
        },
        {
          x: "Sinter_bf_K₂O",
          y: [30, 70],
          fillColor: "#605D64",
        },
        {
          x: "Sinter_bf_MgO",
          y: [50, 80],
        },
        {
          x: "Coke Moisture",
          y: [70, 40],
          fillColor: "#605D64",
        },
        {
          x: "O₂ Enrichment",
          y: [60, 30],
          fillColor: "#605D64",
        },
        {
          x: "PWI",
          y: [60, 30],
        },

        // {
        //   x: 'Oxygen Enrichmen', // Second instance of Oxygen Enrichment
        //   y: [45, 30],
        //   seriesIndex: 2 // Unique identifier
        // },
        {
          x: "Final Value",
          y: [30, 15],
          fillColor: "#FFC107",
        },
      ],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "rangeBar",
      toolbar: {
        show: false, // Disabling the toolbar
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // Vertical bars
      },
    },
    xaxis: {
      type: "category", // Using categories for x-axis labels,
      //   labels: {
      //     formatter: function (value, timestamp, index) {
      //       // Replace with your own logic for line breaks
      //       // For example, break at "Oxygen Enrichment"
      //       return value? value.split(" ").join("\n") : "";
      //     },
      //   },
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        show: false, // Hide y-axis data labels
      },
    },
  };

  const handleToggle1 = () => {
    setIsExpanded1((prevExpanded) => !prevExpanded);
  };

  const handleToggle4 = () => {
    setIsExpanded4((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="flex flex-col gap-[6px] w-full h-full ">
      {/* silicn nav bar */}

      {/*charts  */}
      {/* fuel chart */}

      <div className="flex flex-col w-full h-[67vh]  p-[6px] overflow-y-auto gap-[16px] ">
        {/* RAFT PCI */}

        <div
          id="RCA"
          className="w-full h-[auto] my-[5px] p-[24px]  rounded-[12px] bg-white   "
        >
          <div
            className={`w-full  flex ${
              size.width < 1024 ? "flex-col gap-5" : ""
            } justify-between   `}
          >
            <div className={`  w-full   `}>
              <div className="flex items-start ">
                <p className="text-neutral-n-30 font-Roboto text-[22px] text-[#525056] font-medium leading-normal">
                  <p className="!text-base  sm:!text-base md:!text-base lg:!text-[22px] ">
                    RAFT{" "}
                  </p>
                </p>
              </div>
              <div className={` flex items-start mt-[10px]   gap-2 `}>
                <div className="w-[40%] border-l-[3px] border-blue-400 flex flex-col items-start  ">
                  {" "}
                  <p className="ml-[16px] text-neutral-n-10 font-Roboto text-[24px] !font-semibold leading-normal">
                    <p className="!text-base  sm:!text-base md:!text-base lg:!text-[22px] !font-semibold ">
                      1200 &deg;C
                    </p>
                  </p>
                  <p className="ml-[16px] text-gray-700 font-roboto text-base font-normal">
                    <p className="!text-xs  sm:!text-xs md:!text-base lg:!text-[16px] ">
                      Current value
                    </p>
                  </p>{" "}
                </div>
                <div className="w-[60%] border-l-[3px] border-red-500 flex flex-col items-start ">
                  <p className="ml-[16px] text-neutral-n-10 font-Roboto text-[24px] font-semibold leading-normal text-[#DC362E]">
                    <p className="!text-base  sm:!text-base md:!text-base lg:!text-[22px] !font-semibold ">
                      1100 &deg;C
                    </p>
                  </p>
                  <p className="ml-[16px] text-gray-700 font-roboto text-base font-normal">
                    <p className="!text-xs  sm:!text-xs md:!text-base lg:!text-[16px] whitespace-nowrap">
                      Recommended value
                    </p>
                  </p>{" "}
                </div>
              </div>
            </div>
            <div className={` w-full    `}>
              <div className="flex items-start ">
                <p className="text-neutral-n-30 font-Roboto text-[22px] text-[#525056] font-medium leading-normal">
                  <p className="!text-base  sm:!text-base md:!text-base lg:!text-[22px] ">
                    PCI{" "}
                  </p>
                </p>
              </div>
              <div className={` flex items-start mt-[10px]   gap-5 `}>
                <div className="w-[40%] border-l-[3px] border-blue-400 flex flex-col items-start  ">
                  {" "}
                  <p
                    className={`ml-[16px] text-neutral-n-10 font-Roboto text-[24px] font-semibold leading-normal whitespace-nowrap`}
                  >
                    <p className="!text-base  sm:!text-base md:!text-base lg:!text-[22px] !font-semibold ">
                      1920 kg/tHM
                    </p>
                  </p>
                  <p
                    className={`ml-[16px]  text-neutral-n-10 font-Roboto text-[24px] font-semibold leading-normal whitespace-nowrap`}
                  >
                    <p className="!text-xs  sm:!text-xs md:!text-base lg:!text-[16px] ">
                      Current value
                    </p>
                  </p>{" "}
                </div>
                <div
                  className={`  w-[60%] border-l-[3px] border-red-500 flex flex-col items-start `}
                >
                  <p
                    className={`   ml-[16px] text-neutral-n-10 font-Roboto text-[24px] font-semibold leading-normal text-[#DC362E]`}
                  >
                    <p className="!text-base  sm:!text-base md:!text-base lg:!text-[22px] !font-semibold ">
                      2000 kg/tHM
                    </p>
                  </p>
                  <p className="ml-[16px] text-gray-700 font-roboto text-base font-normal">
                    <p className="!text-xs  sm:!text-xs md:!text-base lg:!text-[16px] whitespace-nowrap">
                      Recommended value
                    </p>
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* actual silicon value */}
        <div className="w-[100%] h-full p-[22px] flex-shrink-0 rounded-[12px] bg-white   ">
          {/* top */}
          <div className="flex justify-between items-start w-[100%] ">
            {/* actual fuel rate top */}
            <div className="flex flex-col items-start justify-center gap-[12px] w-[572px]">
              <div className="flex items-center gap-[8px]">
                {" "}
                <div className=" font-roboto text-[22px] text-[#3E3C42] font-medium">
                  <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
                    Actual Silicon Value
                  </p>
                </div>
                <div className="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal">
                  <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
                    {" "}
                    %
                  </p>
                </div>
              </div>
              <div
                className={`flex  ${
                  size.width <= 768 ? "flex-col" : ""
                } items-start gap-[2%] w-[80%]  `}
              >
                <div className="flex gap-[2px] items-center justify-center">
                  <div className="flex gap-[2px] ">
                    <img src="/Bficons/darkgreendot.svg" alt="" />
                  </div>
                  <div className="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
                    {" "}
                    Current value
                  </div>
                </div>
                <div className="flex gap-[2px] ">
                  <div>
                    <img src="/Bficons/tealblue.svg" alt="" />
                  </div>
                  <div className="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
                    Predictive value
                  </div>
                </div>
                <div className="flex gap-[2px] ">
                  <div>
                    <img src="/Bficons/blackdot.svg" alt="" />
                  </div>
                  <div className="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
                    Ideal Upper/Lower limit
                  </div>
                </div>
              </div>
            </div>
            <div className="fill-white drop-shadow-md" onClick={handleToggle1}>
              <img src="/dropicon.svg" alt="" />
            </div>
          </div>
          {/* bottom */}

          {isExpanded1 && (
            <div
              className={`flex ${
                size.width <= 768 ? "flex-col" : ""
              }  gap-[12px] w-full  h-[300px] `}
            >
              <div
                class={`  ${
                  size.width <= 768 ? "w-full" : "w-[25%]"
                }  flex flex-col items-start h-[300px]  p-[12px] gap-[28px]  flex-shrink-0 rounded-[12px] bg-blue-100`}
              >
                {/* current fuel rate */}

                <div className="flex flex-col items-start gap-[8px]">
                  <p className="text-primary-p-10 text-[#084298] text-center font-roboto text-[18px] font-medium leading-normal">
                    79%
                  </p>
                  <p
                    className="text-neutral-n-70 font-roboto text-[14px] font-normal leading-normal"
                    style={{ color: "#938F96" }}
                  >
                    Current Silicon Value{" "}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-[8px]">
                  <p className="text-neutral-n-10 text-[#3E3C42] text-center font-roboto text-[18px] font-medium leading-normal">
                    {/* 540 kg/tHM */}
                  </p>
                  <p
                    className="text-neutral-n-70 font-roboto text-[14px] font-normal leading-normal"
                    style={{ color: "#938F96" }}
                  >
                    {/* Baseline Fuel Rate{" "} */}
                  </p>
                </div>
              </div>
              {/* charts */}
              <div
                class={`  ${
                  size.width <= 768 ? "w-full" : "w-[75%]"
                }  flex flex-col  h-full    items-start   p-[12px] gap-[28px]  rounded-[12px] `}
              >
                <div id="chart" className="h-[100%] w-full">
                  <Linechart chart={fuelchart} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* rcaa2 */}
        <div className="flex flex-col w-full gap-3 bg-white p-4 rounded-xl  shadow-md ">
          {/* top */}
          <div class="flex justify-between w-full  ">
            <div class="flex flex-col items-start justify-center gap-[12px] w-full ">
              <div className="flex items-center gap-[8px]">
                {" "}
                <div class=" font-roboto text-[22px] text-[#3E3C42] font-medium">
                  <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
                    RCA
                  </p>
                </div>
                <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
                <div className="flex justify-center items-center  w-[50px]"></div>
              </div>
              <div className={`flex items-start gap-[2%] w-[80%]  `}>
                <div className={`flex items-start gap-[2%] w-[100%] `}>
                  <div className="flex gap-[2px] items-center justify-center">
                    <div className="flex gap-[2px] ">
                      <img src="/Bficons/darkblue.svg" alt="" />
                    </div>
                    <div className="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
                      {" "}
                      Controllable
                    </div>
                  </div>
                  <div className="flex gap-[2px] ">
                    <div>
                      <img src="/Bficons/blackdot.svg" alt="" />
                    </div>
                    <div className="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
                      Non-Controllable
                    </div>
                  </div>
                  <div className="flex gap-[2px] ">
                    <div>
                      <img src="/Bficons/brightyellowdot.svg" alt="" />
                    </div>
                    <div className="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
                      Initial/Final values
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={handleToggle4} className="">
              <img src="/dropicon.svg" alt="" />
            </div>
          </div>
          {/* bottom */}
          {isExpanded4 && (
            <div className={`flex gap-[12px] w-full  h-full`}>
              <div
                className={`w-[25%] flex flex-col items-start h-[100%]  p-[12px] gap-[28px]  rounded-[12px] bg-blue-100`}
              >
                {/* current fuel rate */}

                <div className="flex flex-col items-start gap-[8px]">
                  <p className=" text-[#084298] text-center  text-[18px] font-medium ">
                    3
                  </p>
                  <p className=" text-[14px] text-[#938F96] font-normal ">
                    Controllable instances{" "}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-[8px]">
                  <p className=" text-[#084298] text-center  text-[18px] font-medium ">
                    3
                  </p>
                  <p className=" text-[#938F96] text-[14px] font-normal ">
                    Uncontrollable instances{" "}
                  </p>
                </div>
              </div>
              {/* charts */}
              <div
                class={` w-[75%] flex flex-col  h-full    items-start   p-[12px] gap-[28px] flex-shrink-0 rounded-[12px] `}
              >
                <div id="chart" className="h-[100%] w-full">
                  <RcawaterfallChart series={series} options={options} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Siliconpredictor;
