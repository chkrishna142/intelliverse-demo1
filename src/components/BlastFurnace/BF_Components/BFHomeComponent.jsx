import { useEffect, useState } from "react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { useWindowSize } from "@uidotdev/usehooks";
import Linechart from "../../Charts/BF_Charts/Linechart";
import DashboardTable from "../../Charts/BF_Charts/DashboardTable";
const BFHomeComponent = ({data,toolname,tableData,pageshift,handleTabChange}) => {
  const size = useWindowSize();

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

  const lineStyle = {
    width: "32%",
    height: "1px",
    background: "#EBEBEB",
  };

  // line chart data

  const [alertS, setAlertState] = useState(0);
  let alertState = 0;

  const handleAlert = () => {
    alertState = alertState + 1;
    // console.log("alert increased", alertState);
  };

  useEffect(() => {
    setAlertState(alertState);
  }, [alertState]);

  const optimalValue = data.chart.optimal_value;
  const current_values = data.chart.values;
  const timeArray = data.chart.times;

  const [chart, setChart] = useState({
    series: [
      {
        name: "Current",
        data: current_values,
      },
      {
        name: "optimal",
        data: Array(data.chart.values.length).fill(optimalValue),
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
        categories: timeArray,
        // [
        //   "11 pm",
        //   "11:10 pm",
        //   "11:20 pm",
        //   "11:30 pm",
        //   "11:40 pm",
        //   "11:50 pm",
        // ]
        labels: {
          show: true,
          rotate: -60,
          rotateAlways: false,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          minHeight: undefined,

          style: {
            colors: [],
            fontSize: "9px",
            // fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 300,
            cssClass: "apexcharts-xaxis-label",
          },
        },

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
 
  
  return (
    <div className="flex  w-[100%] text-left pb-0 flex-col items-end mt-[10px] rounded-[12px]">
      <div className="flex flex-col w-full h-auto gap-[5px]  items-center rounded-[12px] bg-[#FFF]  ">
        {/* top part of div */}
        <div className="flex  justify-between items-center self-stretch rounded-t-[12px]  bg-[#084298] w-[100%] h-[81px] px-[16px] py-[16px]">
          <div className="flex  flex-col items-start gap-0 w-[146px]">
            <p className="text-white text-neutral-n-99 text-[14px]  md:text-[15px] lg:text-[18px]  font-normal" >
              {toolname}
            </p>
            <p className="text-[#6CA6FC] , text-[16px] font-[500]   md:text-[15px] lg:text-[18px] ">
              {optimalValue} kg/tHM
            </p>
          </div>
          {/* condition for numbers of alert or optimal  */}

          {alertS === 0 ? (
            // show optimal
            <div className={` flex p-6 px-8 items-center gap-1  ${size.width<420? "w-[100px]":"w-[118px]"} h-[44px] rounded-[8px] justify-center bg-[#69B04B] `}>
              <CheckCircleOutlineIcon
                // style={{ width: "38px", height: "38px", color: "#FFF" }}
                style={{ width: `${size.width < 420 ? '28px' : '30px'}`,
                 height:`${size.width < 420 ? '28px' : '30px'}`, color: '#FFF' }}
            
              />
              <p className="text-[#FFF] text-[18px] text-base  md:text-[15px] lg:text-[18px]  font-normal ">Optimal</p>
            </div>
          ) : (
            //  alert
            <div className={` flex p-6 px-8 items-center gap-2  ${size.width<420? "w-[100px]":"w-[118px]"} h-[44px] rounded-[8px] justify-center bg-[#DC362E] `}>
            <WarningTwoIcon  style={{ width: `${size.width < 420 ? '20px' : '25px'}`,
                 height:`${size.width < 420 ? '20px' : '25px'}`, color: '#FFF' }}/>
              <div>
                <p className={`flex items-center   ${size.width<420? "w-[50px]":"w-[58px]"}  text-white  text-[18px] text-base  md:text-[15px] lg:text-[18px] font-normal `}>
                  {alertS} Alert
                </p>
              </div>
            </div>
          )}
        </div>
        {/* chart part */}
        {/* <div className="w-[95%] h-[200px] ">
          <Linechart chart={chart} />
        </div> */}

        {/* mid part of div */}
        {/* top drivers */}
        {/* <div
          style={{ justifyContent: "center" }}
          className="flex items-center  w-[100%] p-3 justify-between  "
        >
          <p className="text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-[18px] text-[#79767D] font-[500] w-[28%] ">
            Top Drivers
          </p>
          <div style={lineStyle}></div>
          <div className="flex w-[38%] ml-[10px] justify-between ">
            <p className="text-xs xs:text-[8px] sm:text-sm md:text-[10px] lg:text-[10px] xl:text-[10px] 2xl:text-[18px] w-[50%] text-[#AEA9B1] text-right font-[400]">
              {formattedDate}
            </p>
            <p className="text-xs xs:text-[8px] sm:text-sm md:text-[10px] lg:text-[10px] xl:text-[10px] 2xl:text-[18px] w-[50%] text-[#AEA9B1] text-right font-[400]">
              {formattedTime}
            </p>
          </div>
        </div> */}
        {/* Tabel */}
        <div className="w-full  p-2 ">
          <DashboardTable
            // rowArray={data.data}
            rowArray={tableData}
            handleAlert={handleAlert}
            tabelname={""}
          />
        </div>
        {/* forward button */}
        <div className="flex  flex-col items-end w-[97%] mb-[10px] rounded-[12px] ">
          {/* <Link to={"/fueloptimizer"}> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewdiv="0 0 44 44"
            fill="none"
            onClick={()=>{pageshift("Silicon Prediction");handleTabChange(3)}}
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

export default BFHomeComponent;