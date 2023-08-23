import React, { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Linechart from "../../Charts/BF_Charts/Linechart";
import FuelrateTable from "../../Charts/BF_Charts/DashboardTable";
import DashboardTable from "../../Charts/BF_Charts/DashboardTable";



const Fuelrate = () => {
  const current = new Date();

  // Format the date
  const day = current.getDate();
  const month = current
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const year = current.getFullYear().toString().slice(-2); // Get last two digits of the year
  const formattedDate = `${day} ${month} ${year}`;

  // Format the time
  const hours = current.getHours();
  const minutes = current.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  console.log("date===", formattedDate); // Output: 17 AUG 23
  console.log("time", formattedTime); // Output: 11:06 am

  const lineStyle = {
    width: "35%",
    height: "1px",
    background: "#EBEBEB",
  };

  // line chart data

  const [chart, setChart] = useState({
    series: [
      {
        name: "Series 1",
        data: [550, 540, 545, 565, 560, 540],
      },
      {
        name: "Series 2",
        data: [548, 548, 548, 548, 548, 548],
      },
    ],

    options: {
      chart: {
        // height: 250,
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
        ],

        // title: {
        //   text: "Month",
        // },
      },
      yaxis: {
        // title: {
        //   text: "Temperature",
        // },
        min: 525,
        max: 575,
        tickAmount: 3,
      },

      colors: ["#6CA6FC", "#69B04B"], // Set the colors for the first and second series
      dataLabels: {
        enabled: [true, false], // Enable for Series 1, disable for Series 2
        enabledOnSeries: [0],
        style: {
          fontSize: 9,
          colors: ["#EDF4FE"],
        },
        background: {
          enabled: true,
          foreColor: "#6CA6FC",
        },
      },
      stroke: {
        curve: "straight",
        width: [1, 2],
        // width: [1, 3, 3, 1],
        dashArray: [0, 6],
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  // tabel

  const [fuelTabel, setFuelTabel] = useState([
    {
      name: "Solution Loss Carbon",
      current: 60,
      optimalRange: "50-80",
      impact: "-",
    },
    {
      name: "Reduction Indirect",
      current: 66,
      optimalRange: "65-70",
      impact: "-",
    },
    {
      name: "Flame Temperature ",
      current: 2290,
      optimalRange: "2280-2375",
      impact: "-",
    },
    {
      name: "etaCO",
      current: 0.47,
      optimalRange: "0.46-0.48",
      impact: "-",
    },
    {
      name: "Reduction Direct",
      current: 34,
      optimalRange: "30-35",
      impact: "-",
    },
  ]);

  return (
    <div
      style={{
       
        borderRadius: "12px",

        marginTop: "10px",
      }}
      class="flex w-[29vw]
   
       text-left pb-0 flex-col items-end   "
    >
      <div
        class="flex flex-col w-full h-auto gap-[5px]  items-center "
        style={{
          // width: "331px",
          borderRadius: "12px",
          background: "#FFF",
          divShadow: "4px 4px 12px 0px rgba(8, 66, 152, 0.10)",
          gap: "5px",
        }}
      >
        {/* top part of div */}
        <div
          style={{
            borderRadius: "12px 12px 0px 0px",
            background: "var(--primary-p-10, #084298)",
            width: "100%",
            height: "81px",
            display: "flex",
            padding: "10px 16px",
            justifyContent: "space-between",
            alignItem: "center",
          }}
          class="flex p-10 px-16 justify-between items-center self-stretch "
        >
          <div
            style={{ width: "146px" }}
            class="flex  flex-col items-start gap-4 "
          >
            <p
              style={{ fontSize: "20px" }}
              class="text-white text-neutral-n-99 font-roboto text-20 font-normal leading-normal "
            >
              Fuel Rate
            </p>
            <p
              style={{
                color: "var(--primary-p-99, #6CA6FC)",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
                marginTop: "-10px",
              }}
            >
              545 kg/tHM
            </p>
          </div>

          <div
            style={{
              width: "133px",
              height: "44px",
              borderRadius: "8px",
              background: "#69B04B",
              alignItem: "center",
              justifyContent: "center",
            }}
            class=" flex p-6 px-8 items-center gap-12 "
          >
            <CheckCircleOutlineIcon
              style={{ width: "38px", height: "38px", color: "#FFF" }}
            />
            <p
              style={{
                color: "#FFF",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",

                width: "120%",
                marginLeft: "-35px",
              }}
            >
              Optimal
            </p>
          </div>
        </div>
        {/* chart part */}
        <div class="w-[95%] h-[180px] ">
          <Linechart  chart={chart}/>
        </div>

        {/* mid part of div */}
        {/* top drivers */}
        <div
          style={{ justifyContent: "center" }}
          class="flex items-center  w-[100%] p-3 justify-between"
        >
          <p
            style={{
              color: " var(--neutral-n-50, #79767D)",

              fontStyle: "normal",
              fontWeight: 500,
              width: "28%",
              lineHeight: "normal",
            }}
            // className="text-neutral-n-60 font-roboto  text-base font-normal"
            class="text-xs md:text-xs lg:text-xs xl:text-xs"
          >
            Top Drivers
          </p>
          <div style={lineStyle}></div>
          <div class="flex w-[37%] ml-[10px]  justify-between ">
            <p
              style={{
                width: "50%",
                color: "var(--neutral-n-70, #AEA9B1)",
                textAlign: "right",

                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
              class="text-xs md:text-xs lg:text-[10px] xl:text-[13px]"
            >
              {formattedDate}
            </p>
            <p
              style={{
                width: "50%",
                color: "var(--neutral-n-70, #AEA9B1)",
                textAlign: "right",

                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
              class="text-xs md:text-xs lg:text-xs xl:text-xs"
            >
              {formattedTime}
            </p>
          </div>
        </div>
        {/* Tabel */}
        <div class="w-full  p-2 ">
          <DashboardTable rowArray={fuelTabel}  tabelname={"fuelrate"} />
        </div>
        {/* forward button */}
        <div
          style={{
            display: "flex",
            width: "97%",

            // padding: "7px",
            paddingBottom: "0px",
            flexDirection: "column",
            alignItems: "flex-end",
            marginBottom: "10px",
            borderRadius: "12px",
          }}
          // className="flex flex-col items-end gap-16 w-331 pb-0"
        >
          {/* <Link to={"/fueloptimizer"}> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewdiv="0 0 44 44"
            fill="none"
          >
            <g filter="url(#filter0_d_260_2062)">
              <rect
                x="38"
                y="38"
                width="32"
                height="32"
                rx="16"
                transform="rotate(180 38 38)"
                fill="white"
              />
              <path
                d="M17.0604 28.12L18.9404 30L26.9404 22L18.9404 14L17.0604 15.88L23.1671 22L17.0604 28.12Z"
                fill="#3E3C42"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_260_2062"
                x="0"
                y="0"
                width="44"
                height="44"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="3" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.00784314 0 0 0 0 0.301961 0 0 0 0 0.529412 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_260_2062"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_260_2062"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Fuelrate;
