import React, { useEffect, useState } from "react";

import Linechart from "../../Charts/BF_Charts/Linechart";
import DashboardTable from "../../Charts/BF_Charts/DashboardTable";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";



const Production = ({data}) => {




  const [productionTabel,setProductionTabel]=useState(
    [
    {
      name:"Oxygen Enrichment",
      current:10.2,
      optimalRange: "10.0-10.3",
      impact: "-",
  
    },
    {
      name:"Cold Blast Volume",
      current:5650,
      optimalRange: "5750-5950",
      impact: "4",
  
    },
    {
      name:"Permeability",
      current:2.55,
      optimalRange: "2.59-2.69",
      impact: "6",
  
    },
    {
      name:"Stave Cooling - Heat Loss",
      current:33,
      optimalRange: "32-34",
      impact: "-",
  
    },
    {
      name:"HS RTD Temp H3",
      current:43,
      optimalRange: "42-45",
      impact: "-",
  
    }
  ])

  const current = new Date();

   // Format the date
   const day = current.getDate();
   const month = current.toLocaleString('default', { month: 'short' }).toUpperCase();
   const year = current.getFullYear().toString().slice(-2); // Get last two digits of the year
   const formattedDate = `${day} ${month} ${year}`;
   
   // Format the time
   const hours = current.getHours();
   const minutes = current.getMinutes();
   const ampm = hours >= 12 ? 'pm' : 'am';
   const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
   const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;



   const [alertS, setAlertState] = useState(0);
   let alertState = 0;
 
   const handleAlert = () => {
     alertState = alertState + 1;
   };
 
   useEffect(() => {
     setAlertState(alertState);
   }, [alertState]);
   




  const lineStyle = {
    width: "35%",
    height: "1px",
    background: "#EBEBEB",
  };


  // line chart

  console.log("table====>", data.chart);
  const optimalValue = data.chart.optimal_value;
  const current_values=data.chart.values;
  const timeArray=data.chart.times


  const [chart, setChart] = useState({
    series: [
      {
        name: "Current",
        data: current_values
        // [9500, 11000, 11500, 10500, 10000,9500]
        ,
      },
      {
        name: "Optimal",
        data:Array(data.chart.values.length).fill(optimalValue)
        //  [10500,10500,10500,10500,10500,10500]
         ,
      },
    ],

    options: {
      chart: {
        height: 250,
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
        categories:timeArray
        //  [
        //   "5 Aug",
        //   "6 Aug",
        //   "7 Aug",
        //   "8 Aug",
        //   "9 Aug",
        //   "10 Aug",
        //   "11 Aug",
         
        // ]
        ,
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
              fontSize: '9px',
              // fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 300,
              cssClass: 'apexcharts-xaxis-label',
          },
        }

       
        // title: {
        //   text: "Month",
        // },
      },
      yaxis: {
        // title: {
        //   text: "Temperature",
        // },
        // min: 6000,
        // max: 14000,
        tickAmount: 4,
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
    <div
      style={{
        // width: "331px",
        marginTop: "10px",

        paddingBottom: "0px",
      }}
      className="flex h-auto  pb-0 text-left flex-col items-end gap-4 w-[100%]"
    >
      <div
        className="flex flex-col bg-blue-300 w-full h-auto items-center  "
        style={{
          // width: "331px",

          borderRadius: "12px",
          background: "#FFF",
          divShadow: "4px 4px 12px 0px rgba(8, 66, 152, 0.10)",
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
          className="flex p-10 px-16 justify-between items-center self-stretch"
        >
          <div
            style={{ width: "146px" }}
            className="flex  flex-col items-start gap-4"
          >
            <p
              style={{ fontSize: "20px" }}
              className="text-white text-neutral-n-99 font-roboto text-20 font-normal leading-normal "
            >
              Production
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
              10500 tpd
            </p>
            {/* <p
            style={{
              color: "var(--primary-p-99, #6CA6FC)",
              fontFamily: "Poppins",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "normal",
              marginTop: "-10px",
            }}
          >
            540 kg/tHM
          </p> */}
          </div>

          {alertS === 0 ? (
            // show optimal
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
          ) : (
            //  alert
            <div
              style={{
                width: "121px",
                height: "44px",
                borderRadius: "8px",
                background: "var(--error-e-50, #DC362E)",
                alignItem: "center",
                justifyContent: "center",
              }}
              className=" flex p-6 px-8 items-center gap-2  "
            >
              <svg
                style={{
                  width: "32px",
                  height: "32px",
                  flexShrink: "0",
                  // marginLeft: "-20px",
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewdiv="0 0 32 32"
                fill="none"
              >
                <path
                  d="M15.9997 8.65334L26.0397 26H5.95967L15.9997 8.65334ZM15.9997 3.33334L1.33301 28.6667H30.6663L15.9997 3.33334ZM17.333 22H14.6663V24.6667H17.333V22ZM17.333 14H14.6663V19.3333H17.333V14Z"
                  fill="white"
                />
              </svg>
              <div>
                <p
                  className="flex items-center text-white font-roboto text-base font-normal "
                  style={{
                    fontSize: "18px",
                    width: "58px",

                    // marginLeft: "8px",
                  }}
                >
                  {alertS} Alert
                </p>
              </div>
            </div>
          )}
        </div>
        {/* chart part */}

        <div class="w-[95%] h-[200px] ">
          <Linechart  chart={chart}/>
        </div>

        {/* top diver */}

        <div
          style={{ justifyContent: "center" }}
          class="flex items-center  w-[100%] p-3 justify-between  "
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
          <div class="flex w-[37%] ml-[10px] justify-between ">
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

        {/* mid part of div */}
        {/* Tabel */}
        <div class="w-full  p-4 ">
        
          <DashboardTable rowArray={data.data} tabelname={"production"}  handleAlert={handleAlert}/>
        </div>
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
        
        </div>
      </div>
    </div>
  );
};

export default Production;
