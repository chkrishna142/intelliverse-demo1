import React, { useEffect, useState } from "react";

import ReactApexChart from "react-apexcharts";

const Impacttrackercharts = () => {
  const [isExpanded1, setIsExpanded1] = useState(true);
  const [isExpanded2, setIsExpanded2] = useState(true);
  const [isExpanded3, setIsExpanded3] = useState(true);

  const [orangechart1, setOrangechart1] = useState({
    series: [25, 75],

    options: {
      chart: {
        type: "pie",
        // width: "100%",
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      // labels: ['Ideal conditions'],
      colors: ["#938F96", "#F77F00"],

      dataLabels: {
        enabled: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [orangechart2, setOrangechart2] = useState({
    series: [25, 75],

    options: {
      chart: {
        type: "pie",
        // width: "100%",
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      // labels: ['Ideal conditions'],
      colors: ["#938F96", "#F77F00"],

      dataLabels: {
        enabled: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [orangechart3, setOrangechart3] = useState({
    series: [25, 75],

    options: {
      chart: {
        type: "pie",
        // width: "100%",
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      // labels: ['Ideal conditions'],
      colors: ["#938F96", "#F77F00"],

      dataLabels: {
        enabled: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [orangechart4, setOrangechart4] = useState({
    series: [25, 75],

    options: {
      chart: {
        type: "pie",
        // width: "100%",
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      // labels: ['Ideal conditions'],
      colors: ["#938F96", "#F77F00"],

      dataLabels: {
        enabled: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [bluechart1, setBluechart1] = useState({
    series: [25, 75],

    options: {
      chart: {
        type: "pie",
        // width: "100%",
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      // labels: ['Ideal conditions'],
      colors: ["#938F96", "#629CF2"],

      dataLabels: {
        enabled: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [bluechart2, setBluechart2] = useState({
    series: [25, 75],

    options: {
      chart: {
        type: "pie",
        // width: "100%",
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      // labels: ['Ideal conditions'],
      colors: ["#938F96", "#629CF2"],

      dataLabels: {
        enabled: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [bluechart3, setBluechart3] = useState({
    series: [25, 75],

    options: {
      chart: {
        type: "pie",
        // width: "100%",
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      // labels: ['Ideal conditions'],
      colors: ["#938F96", "#629CF2"],

      dataLabels: {
        enabled: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [bluechart4, setBluechart4] = useState({
    series: [25, 75],

    options: {
      chart: {
        type: "pie",
        // width: "100%",
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      // labels: ['Ideal conditions'],
      colors: ["#938F96", "#629CF2"],

      dataLabels: {
        enabled: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  const [tealchart1, setTealchart1] = useState({
    series: [25, 75],

    options: {
      chart: {
        type: "pie",
        // width: "100%",
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      // labels: ['Ideal conditions'],
      colors: ["#938F96", "#16FCD2"],

      dataLabels: {
        enabled: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [tealchart2, setTealchart2] = useState({
    series: [25, 75],

    options: {
      chart: {
        type: "pie",
        // width: "100%",
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      // labels: ['Ideal conditions'],
      colors: ["#938F96", "#16FCD2"],

      dataLabels: {
        enabled: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [tealchart3, setTealchart3] = useState({
    series: [25, 75],

    options: {
      chart: {
        type: "pie",
        // width: "100%",
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      // labels: ['Ideal conditions'],
      colors: ["#938F96", "#16FCD2"],

      dataLabels: {
        enabled: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [tealchart4, setTealchart4] = useState({
    series: [25, 75],

    options: {
      chart: {
        type: "pie",
        // width: "100%",
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      // labels: ['Ideal conditions'],
      colors: ["#938F96", "#16FCD2"],

      dataLabels: {
        enabled: false,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });




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






  const handleToggle1 = () => {
    setIsExpanded1((prevExpanded) => !prevExpanded);
  };

  const handleToggle2 = () => {
    setIsExpanded2((prevExpanded) => !prevExpanded);
  };

  const handleToggle3 = () => {
    setIsExpanded3((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="flex flex-col gap-[6px] w-full  ">
      {/* impac tracker nav bar */}
      
      {/*charts  */}
     

      <div className="h-[68vh] w-full   p-[2px] overflow-y-auto gap-[16px] ">
        <div class="w-full h-[auto]  p-[24px]  rounded-[12px] bg-white ">
          {/* Fuel rate pie chat */}
          {/* top */}
          <div class="flex justify-between items-start w-full ">
            {/* actual fuel rate top */}
            <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
              <div className="flex items-center gap-[8px]">
                {" "}
                <div class="text-black font-roboto text-[22px] text-[#000] font-medium">
                <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
                Fuel Rate
                  </p>
                  
                </div>
                <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
              </div>
              <div className="flex text-[#605D64] text-[18px] font-medium items-start gap-[32px] ">
              <p className="!text-xs  sm:!text-sm md:!text-base lg:!text-[20px] ">
              Total time: 24 hrs
                  </p>
               
              </div>
            </div>
            <div class="fill-white drop-shadow-md" onClick={handleToggle1}>
            <img src="/dropicon.svg" alt="" />
            </div>
          </div>
          {/* bottom */}

          {isExpanded1 && (
            <div className={` flex w-[100%]  mt-[20px] p-[0px]  gap-4  items-center ${windowWidth<1440 ? " overflow-x-scroll":""}  `}>
              {/* pi chart 1 */}
              <div class={` flex flex-col items-center  ${windowWidth<1440 ? " w-[270px] ":"w-[27%]"}    h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px] `}>
                {/* top text */}
                   <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#525056] text-[16px] font-roboto font-medium text-base ">
                    Non-Ideal conditions (22 hrs)
                  </div>
                  <div class="text-orange-500 font-roboto font-medium text-base">
                    43.5%
                  </div>
                   </div>
                {/* pi chart */}
                   <div class=" w-[full] flex flex-col">
                  {" "}
                  <div id="chart">
                    <ReactApexChart
                      options={orangechart1.options}
                      series={orangechart1.series}
                      type="pie"
                      width={"110%"}
                    />
                  </div>
                   </div>

                {/* svg and text */}
                  <div class="flex gap-[8px] text-left w-[80%]">
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
                  <div class="text-start text-left  mt-[-5px]">
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      Ideal conditions (22 hrs) 
                    </div>
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base font-medium">
                      43.5%
                    </div>
                  </div>
                  </div>
              </div>
              {/* pi chart 2 */}
              
              <div class="flex flex-col items-center w-[250px]   h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px]  ">
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#525056] text-[16px] font-roboto font-medium text-base">
                    Recommendations given <br /> (16 hrs)
                  </div>
                  <div class="text-orange-500 font-roboto font-medium text-base">
                    43.5%
                  </div>
                </div>
                {/* pi chart */}
                <div class=" w-[full] flex flex-col">
                  {" "}
                  <div id="chart">
                    <ReactApexChart
                      options={orangechart2.options}
                      series={orangechart2.series}
                      type="pie"
                      width={"110%"}
                    />
                  </div>
                </div>
                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
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
                  <div class="text-start text-left  mt-[-5px]">
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      No recommendation (16 hrs)
                    </div>
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base font-medium">
                      43.5%
                    </div>
                  </div>
                </div>
              </div>
              {/* pi chart 3 */}
              <div class="flex flex-col items-center w-[220px]  h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px]  ">
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#525056] text-[16px] font-roboto font-medium text-base">
                    Recommendation <br /> followed (12 hrs)
                  </div>
                  <div class="text-orange-500 font-roboto font-medium text-base">
                    43.5%
                  </div>
                </div>
                {/* pi chart */}
                <div class=" w-[full] flex flex-col">
                  {" "}
                  <div id="chart">
                    <ReactApexChart
                      options={orangechart3.options}
                      series={orangechart3.series}
                      type="pie"
                      width={"110%"}
                    />
                  </div>
                </div>
                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
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
                  <div class="text-start text-left  mt-[-5px]">
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      Recommendation ignored (12 hrs)
                    </div>
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      43.5%
                    </div>
                  </div>
                </div>
              </div>
              {/* pi chart 4 */}
              <div class="flex flex-col items-center w-[200px]  h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px]  ">
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#525056] text-[16px] font-roboto font-medium text-base">
                    Ideal state attained <br />
                    (8 hrs)
                  </div>
                  <div class="text-orange-500 font-roboto font-medium text-base">
                    43.5%
                  </div>
                </div>
                {/* pi chart */}
                <div class=" w-[full] flex flex-col">
                  {" "}
                  <div id="chart">
                    <ReactApexChart
                      options={orangechart1.options}
                      series={orangechart1.series}
                      type="pie"
                      width={"110%"}
                    />
                  </div>
                </div>
                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
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
                  <div class="text-start text-left  mt-[-5px]">
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      Ideal state not attained (8 hrs)
                    </div>
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base font-medium">
                      43.5%
                    </div>
                  </div>
                </div>
              </div>
              {/* pi chart 5 */}
              <div class="flex flex-col  items-center w-[180px]  h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px]  ">
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#3E3C42] text-[18px] font-roboto font-medium text-base">
                    Monetary Impact
                  </div>
                </div>
                {/* pi chart */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewdiv="0 0 138 138"
                  fill="none"
                >
                  <circle cx="50" cy="50" r="50" fill="#69B04B" />

                  <text
                    x="50%"
                    y="50%"
                    text-anchor="middle"
                    fill="white"
                    font-size="24"
                  >
                    <tspan x="50%" dy="0em" fontSize="18px" font-weight="600">
                      ₹ 100 Cr.
                    </tspan>
                    <tspan x="50%" dy="1em" fontSize="16px"  font-weight="400">
                      saved
                    </tspan>
                  </text>
                </svg>

                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
                  {/* svg div */}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* throughtput*/}
        <div class="w-[100%] h-[auto] p-[24px] mt-[10px] flex-shrink-0 rounded-[12px] bg-white element transition-colors duration-1000 ease-in-out ">
          {/* through pie chat */}
          {/* top */}
          <div class="flex justify-between items-start w-[100%]">
            {/* thruogh top */}
            <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
              <div className="flex items-center gap-[8px]">
                {" "}
                <div class="text-black font-roboto text-[22px] text-[#000] font-medium">
                  Throughput
                </div>
                <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
              </div>
              <div className="flex text-[#605D64] text-[18px] font-medium items-start gap-[32px] ">
                Total time: 24 hrs
              </div>
            </div>
            <div class="fill-white drop-shadow-md" onClick={handleToggle2}>
            <img src="/dropicon.svg" alt="" />
            </div>
          </div>
          {/* bottom */}

          {isExpanded2 && (
            <div className={ ` flex w-[100%]  mt-[20px] p-[2px]  items-center ${windowWidth<1440 ? "overflow-x-scroll":"" } `}>
              {/* pi chart 1 */}
              <div class={` flex flex-col items-center ${windowWidth<1440 ? " w-[270px] ":"w-[27%]"}    h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px] `}>
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#525056] text-[16px] font-roboto font-medium text-base">
                    Non-Ideal conditions (22 hrs)
                  </div>
                  <div class="text-[#629CF2] font-roboto font-medium text-base">
                    43.5%
                  </div>
                </div>
                {/* pi chart */}
                <div class=" w-[full] flex flex-col">
                  {" "}
                  <div id="chart">
                    <ReactApexChart
                      options={bluechart1.options}
                      series={bluechart1.series}
                      type="pie"
                      width={"110%"}
                    />
                  </div>
                </div>

                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
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
                  <div class="text-start text-left  mt-[-5px]">
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      Ideal conditions (22 hrs)
                    </div>
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base font-medium">
                      43.5%
                    </div>
                  </div>
                </div>
              </div>
              {/* pi chart 2 */}
              
              <div class="flex flex-col items-center w-[250px]   h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px] ">
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#525056] text-[16px] font-roboto font-medium text-base">
                    Recommendations given <br /> (16 hrs)
                  </div>
                  <div class="text-[#629CF2] font-roboto font-medium text-base">
                    43.5%
                  </div>
                </div>
                {/* pi chart */}
                <div class=" w-[full] flex flex-col">
                  {" "}
                  <div id="chart">
                    <ReactApexChart
                      options={bluechart2.options}
                      series={bluechart2.series}
                      type="pie"
                      width={"110%"}
                    />
                  </div>
                </div>
                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
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
                  <div class="text-start text-left  mt-[-5px]">
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      No recommendation (16 hrs)
                    </div>
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base font-medium">
                      43.5%
                    </div>
                  </div>
                </div>
              </div>
              {/* pi chart 3 */}
              <div class="flex flex-col items-center w-[220px] h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px]  ">
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#525056] text-[16px] font-roboto font-medium text-base">
                    Recommendation <br /> followed (12 hrs)
                  </div>
                  <div class="text-[#629CF2] font-roboto font-medium text-base">
                    43.5%
                  </div>
                </div>
                {/* pi chart */}
                <div class=" w-[full] flex flex-col">
                  {" "}
                  <div id="chart">
                    <ReactApexChart
                      options={bluechart3.options}
                      series={bluechart3.series}
                      type="pie"
                      width={"110%"}
                    />
                  </div>
                </div>
                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
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
                  <div class="text-start text-left  mt-[-5px]">
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      Recommendation ignored (12 hrs) 
                    </div>
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      43.5%
                    </div>
                  </div>
                </div>
              </div>
              {/* pi chart 4 */}
              <div class="flex flex-col items-center w-[200px]  h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px]  ">
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#525056] text-[16px] font-roboto font-medium text-base">
                    Ideal state attained <br />
                    (8 hrs)
                  </div>
                  <div class="text-[#629CF2] font-roboto font-medium text-base">
                    43.5%
                  </div>
                </div>
                {/* pi chart */}
                <div class=" w-[full] flex flex-col">
                  {" "}
                  <div id="chart">
                    <ReactApexChart
                      options={bluechart4.options}
                      series={bluechart4.series}
                      type="pie"
                      width={"110%"}
                    />
                  </div>
                </div>
                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
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
                  <div class="text-start text-left  mt-[-5px]">
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      Ideal state not attained (8 hrs)
                    </div>
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base font-medium">
                      43.5%
                    </div>
                  </div>
                </div>
              </div>
              {/* pi chart 5 */}
              <div class="flex flex-col items-center w-[180px] h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px]  ">
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#3E3C42] text-[18px] font-roboto font-medium text-base">
                    Monetary Impact
                  </div>
                </div>
                {/* pi chart */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewdiv="0 0 138 138"
                  fill="none"
                >
                  <circle cx="50" cy="50" r="50" fill="#69B04B" />

                  <text
                    x="50%"
                    y="50%"
                    text-anchor="middle"
                    fill="white"
                    font-size="24"
                  >
                    <tspan x="50%" dy="0em" fontSize="18px" font-weight="600">
                      ₹ 100 Cr.
                    </tspan>
                    <tspan x="50%" dy="1em" fontSize="16px"  font-weight="400">
                      saved
                    </tspan>
                  </text>
                </svg>

                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
                  {/* svg div */}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Si vlaue */}
        <div class="w-[100%] h-[auto] p-[24px] mt-[10px] flex-shrink-0 rounded-[12px] bg-white element transition-colors duration-1000 ease-in-out ">
          {/* si value chart */}
          {/* top */}
          <div class="flex justify-between items-start w-[100%]">
            {/* si top */}
            <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
              <div className="flex items-center gap-[8px]">
                {" "}
                <div class="text-black font-roboto text-[22px] text-[#000] font-medium">
                  Si Value
                </div>
                <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
              </div>
              <div className="flex text-[#605D64] text-[18px] font-medium items-start gap-[32px] ">
                Total time: 24 hrs
              </div>
            </div>
            <div class="fill-white drop-shadow-md" onClick={handleToggle3}>
            <img src="/dropicon.svg" alt="" />
            </div>
          </div>
          {/* bottom */}

          {isExpanded3 && (
            <div className={ ` flex w-[100%]  mt-[20px] p-[2px]  items-center ${windowWidth<1440 ? "overflow-x-scroll":"" } `}>
            {/* pi chart 1 */}
            <div class={` flex flex-col items-center ${windowWidth<1440 ? " w-[270px] ":"w-[27%]"}    h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px] `}>
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#525056] text-[16px] font-roboto font-medium text-base">
                    Non-Ideal conditions (22 hrs)
                  </div>
                  <div class="text-[#06B898] font-roboto font-medium text-base">
                    43.5%
                  </div>
                </div>
                {/* pi chart */}
                <div class=" w-[full] flex flex-col">
                  {" "}
                  <div id="chart">
                    <ReactApexChart
                      options={tealchart1.options}
                      series={tealchart1.series}
                      type="pie"
                      width={"110%"}
                    />
                  </div>
                </div>

                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
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
                  <div class="text-start text-left  mt-[-5px]">
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      Ideal conditions (22 hrs)
                    </div>
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base font-medium">
                      43.5%
                    </div>
                  </div>
                </div>
              </div>
              {/* pi chart 2 */}
              <div class="flex flex-col items-center w-[250px]  h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px] ">
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#525056] text-[16px] font-roboto font-medium text-base">
                    Recommendations given <br /> (16 hrs)
                  </div>
                  <div class="text-[#06B898] font-roboto font-medium text-base">
                    43.5%
                  </div>
                </div>
                {/* pi chart */}
                <div class=" w-[full] flex flex-col">
                  {" "}
                  <div id="chart">
                    <ReactApexChart
                      options={tealchart2.options}
                      series={tealchart2.series}
                      type="pie"
                      width={"110%"}
                    />
                  </div>
                </div>
                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
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
                  <div class="text-start text-left  mt-[-5px]">
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      No recommendation (16 hrs)
                    </div>
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base font-medium">
                      43.5%
                    </div>
                  </div>
                </div>
              </div>
             
              {/* pi chart 3 */}
              <div class="flex flex-col items-center w-[220px]  h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px]  ">
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#525056] text-[16px] font-roboto font-medium text-base">
                    Recommendation <br /> followed (12 hrs)
                  </div>
                  <div class="text-[#06B898] font-roboto font-medium text-base">
                    43.5%
                  </div>
                </div>
                {/* pi chart */}
                <div class=" w-[full] flex flex-col">
                  {" "}
                  <div id="chart">
                    <ReactApexChart
                      options={tealchart3.options}
                      series={tealchart3.series}
                      type="pie"
                      width={"110%"}
                    />
                  </div>
                </div>
                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
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
                  <div class="text-start text-left  mt-[-5px]">
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      Recommendation ignored (12 hrs)
                    </div>
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      43.5%
                    </div>
                  </div>
                </div>
              </div>
              {/* pi chart 4 */}
              <div class="flex flex-col items-center w-[200px]  h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px]  ">
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#525056] text-[16px] font-roboto font-medium text-base">
                    Ideal state attained <br />
                    (8 hrs)
                  </div>
                  <div class="text-[#06B898] font-roboto font-medium text-base">
                    43.5%
                  </div>
                </div>
                {/* pi chart */}
                <div class=" w-[full] flex flex-col">
                  {" "}
                  <div id="chart">
                    <ReactApexChart
                      options={tealchart4.options}
                      series={tealchart4.series}
                      type="pie"
                      width={"110%"}
                    />
                  </div>
                </div>
                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
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
                  <div class="text-start text-left  mt-[-5px]">
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base">
                      Ideal state not attained (8 hrs)
                    </div>
                    <div class="text-[#938F96] text-neutral-n-60 font-roboto text-base font-medium">
                      43.5%
                    </div>
                  </div>
                </div>
              </div>
              {/* pi chart 5 */}
              <div class="flex flex-col items-center w-[180px] h-auto p-[12px] gap-[28px] flex-shrink-0 rounded-[12px]  ">
                {/* top text */}
                <div className="flex flex-col gap-[6px] text-left">
                  <div class="text-neutral-n-30 text-[#3E3C42] text-[18px] font-roboto font-medium text-base">
                    Monetary Impact
                  </div>
                </div>
                {/* pi chart */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewdiv="0 0 138 138"
                  fill="none"
                >
                  <circle cx="50" cy="50" r="50" fill="#69B04B" />

                  <text
                    x="50%"
                    y="50%"
                    text-anchor="middle"
                    fill="white"
                    font-size="24"
                  >
                    <tspan x="50%" dy="0em" fontSize="18px" font-weight="600">
                      ₹ 100 Cr.
                    </tspan>
                    <tspan x="50%" dy="1em" fontSize="16px"  font-weight="400">
                      saved
                    </tspan>
                  </text>
                </svg>

                {/* svg and text */}
                <div class="flex gap-[8px] text-left w-[80%]">
                  {/* svg div */}
                </div>
              </div>
            </div>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default Impacttrackercharts;
