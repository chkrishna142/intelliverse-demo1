import React, { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Linechart from "../../Charts/BF_Charts/Linechart";
import FuelrateTable from "../../Charts/BF_Charts/DashboardTable";
import DashboardTable from "../../Charts/BF_Charts/DashboardTable";
import { type } from "@testing-library/user-event/dist/type";
import { useWindowSize } from "@uidotdev/usehooks";
import { WarningTwoIcon } from "@chakra-ui/icons";

const Fuelrate = ({ data, pageshift, handleTabChange }) => {
  const current = new Date();
  const size = useWindowSize();
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

  const lineStyle = {
    width: "100%",
    height: "1px",
    background: "#EBEBEB",
  };

  // line chart data

  const [alertS, setAlertState] = useState(0);
  // let alertState = 0;

  const resetAlert=()=>{
    setAlertState(0);
  }

  const handleAlert = () => {
    console.log("alert updates")
    setAlertState(prev => prev + 1)
    // alertState = alertState + 1;
    // console.log("alert increased", alertState);
  };

  // useEffect(() => {
  //   setAlertState(alertState);
  // }, [alertState]);

  const optimalValue = Math.floor(data.chart.optimal_value);
  let current_values = data.chart.values;
  let current_values_Lastelement=current_values[current_values.length-1]
  // if(current_values.length<=5){
  //    current_values=[530,540,533,555,568,550,];
  // // console.log("current valuess--->", current_values.length);

  // }

  const timeArray = data.chart.times;

  

  const chart = {
    series: [
      {
        name: "Current",
        data: current_values,
      },
      {
        name: "optimal",
        data: Array(data.chart.values.length).fill(optimalValue),
        // data: Array(6).fill(optimalValue),
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
        size: [1,0],
      },
      xaxis: {
        categories: timeArray,
        tickAmount: 5, // Display only 5 ticks
        labels: {
          show: true,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: true,
          style: {
            colors: [],
            fontSize: "9px",
            fontWeight: 300,
            cssClass: "apexcharts-xaxis-label",
          },
        },
        tickPlacement: 'on', // Place ticks between labels
      },
      yaxis: {
        // title: {
        //   text: "Temperature",
        // // },
        // min: 525,
        // max: 575,
        tickAmount: 4,
      },

      colors: ["#6CA6FC", "#69B04B"], // Set the colors for the first and second series
      dataLabels: {
        enabled: true, // Enable for Series 1, disable for Series 2
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
      tooltip: {
        enabled: true, // Enable for Series 1, disable for Series 2
        enabledOnSeries: [0],
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          var data1 = w.globals.initialSeries[0].data[dataPointIndex];
        
          return '<div class="  bg-blue-200  border border-gray-300 shadow-md rounded-md p-2  flex  flex-col justify-center items-center  h-[40px] w-[120px]" >' +
          
          '<p class=" bottom-[20%] left-[5px] font-normal mt-4 mb-2  p-2 bg-blue-200 "> <span class="font-bold">Value: </span>'+  data1+'</p>' +
          
          '</div>';
        },
        // fixed: {
        //   enabled: true,
        //   // position: "leftCenter",
        //   offsetX: 0,
        //   offsetY: 0,
        // },
      }
    },
  };

  // tabel
 

  //  console.log("table",fuelTabel)

  // const [fuelTabel, setFuelTabel] = useState([
  //   {
  //     name: "Solution Loss Carbon",
  //     current: 60,
  //     optimalRange: "50-80",
  //     impact: "-",
  //   },
  //   {
  //     name: "Reduction Indirect",
  //     current: 66,
  //     optimalRange: "65-70",
  //     impact: "-",
  //   },
  //   {
  //     name: "Flame Temperature ",
  //     current: 2290,
  //     optimalRange: "2280-2375",
  //     impact: "-",
  //   },
  //   {
  //     name: "etaCO",
  //     current: 0.47,
  //     optimalRange: "0.46-0.48",
  //     impact: "-",
  //   },
  //   {
  //     name: "Reduction Direct",
  //     current: 34,
  //     optimalRange: "30-35",
  //     impact: "-",
  //   },
  // ]);

  return (
    <div className="flex  w-[100%] text-left pb-0 flex-col items-end mt-[10px] rounded-[12px]">
      <div className="flex flex-col w-full h-auto gap-[5px]  items-center rounded-[12px] bg-[#FFF]  ">
        {/* top part of div */}
        <div className="flex  justify-between items-center self-stretch rounded-t-[12px]  bg-[#084298] w-[100%] h-[81px] px-[16px] py-[16px]">
          <div className="flex  flex-col items-start gap-0 w-[146px]">
            <p className="text-white text-neutral-n-99 text-[14px]  md:text-[15px] lg:text-[18px]  font-normal">
              Fuel Rate
            </p>
            <p className="text-[#6CA6FC] , text-[16px] font-[500]   md:text-[15px] lg:text-[18px]">
              {current_values_Lastelement} kg/tHM
            </p>
          </div>
          {/* condition for numbers of alert or optimal  */}

          {alertS === 0 ? (
            // show optimal
            <div
              className={` flex p-6 px-8 items-center gap-1  ${
                size.width < 420 ? "w-[100px]" : "w-[118px]"
              } h-[44px] rounded-[8px] justify-center bg-[#69B04B] `}
            >
              <CheckCircleOutlineIcon
                // style={{ width: "38px", height: "38px", color: "#FFF" }}
                style={{
                  width: `${size.width < 420 ? "28px" : "30px"}`,
                  height: `${size.width < 420 ? "28px" : "30px"}`,
                  color: "#FFF",
                }}
              />
              <p className="text-[#FFF] text-[18px] text-base  md:text-[15px] lg:text-[18px]  font-normal ">
                Optimal
              </p>
            </div>
          ) : (
            //  alert
            <div
              className={` flex p-6 px-8 items-center gap-2  ${
                size.width < 420 ? "w-[100px]" : "w-[118px]"
              } h-[44px] rounded-[8px] justify-center bg-[#DC362E] `}
            >
              <WarningTwoIcon
                style={{
                  width: `${size.width < 420 ? "20px" : "25px"}`,
                  height: `${size.width < 420 ? "20px" : "25px"}`,
                  color: "#FFF",
                }}
              />
              <div>
                <p
                  className={`flex items-center   ${
                    size.width < 420 ? "w-[50px]" : "w-[58px]"
                  }  text-white  text-[18px] text-base  md:text-[15px] lg:text-[18px] font-normal `}
                >
                  {alertS} Alert
                </p>
              </div>
            </div>
          )}
        </div>
        {/* chart part */}
        <div className="w-[95%] h-[230px]  ">
          <Linechart chart={chart} />
        </div>

        {/* mid part of div */}
        {/* top drivers */}
        <div
          style={{ justifyContent: "center" }}
          className="flex items-center  w-[100%] p-3 justify-between  "
        >
          <p className="text-xs md:text-xs lg:text-xs xl:text-xs text-[#79767D] font-[500] w-[28%] ">
            Top Drivers
          </p>
          <div style={lineStyle}></div>
          {/* <div className="flex w-[37%] ml-[10px] justify-between ">
            <p className="text-xs md:text-xs lg:text-[10px] xl:text-[13px] w-[50%] text-[#AEA9B1] text-right font-[400]">
              {formattedDate}
            </p>
            <p className="text-xs md:text-xs lg:text-xs xl:text-xs w-[50%] text-[#AEA9B1] text-right font-[400]">
              {formattedTime}
            </p>
          </div> */}
        </div>
        {/* Tabel */}
        <div className="w-full  p-2 ">
          <DashboardTable
            rowArray={data.data}
            handleAlert={handleAlert}
            resetAlert={resetAlert}
            tabelname={"fuelrate"}
          />
        </div>
        {/* forward button */}
        <div className="flex  flex-col items-end w-[97%] mb-[10px] rounded-[12px]">
          {/* <Link to={"/fueloptimizer"}> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewdiv="0 0 44 44"
            fill="none"
            onClick={() => {
              pageshift("fuel optimizer");
              handleTabChange(1);
            }}
            cursor="pointer"
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
