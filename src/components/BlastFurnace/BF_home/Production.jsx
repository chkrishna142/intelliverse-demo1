import React, { useEffect, useState } from "react";
import Linechart from "../../Charts/BF_Charts/Linechart";
import DashboardTable from "../../Charts/BF_Charts/DashboardTable";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useWindowSize } from "@uidotdev/usehooks";
import { WarningTwoIcon } from "@chakra-ui/icons";



const Production = ({data}) => {

  const size = useWindowSize();


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
           <div className="flex  flex-col items-start gap-0 w-[146px]">
                       <p className="text-white text-neutral-n-99 text-base  md:text-[15px] lg:text-[20px]  font-normal">

              Production
            </p>
            <p className="text-[#6CA6FC] , text-[16px] font-[500]   md:text-[15px] lg:text-[20px] ">
              10500 tpd
            </p>
           
          </div>

          {alertS === 0 ? (
            // show optimal
            <div className={` flex p-6 px-8 items-center gap-2  ${size.width<420? "w-[100px]":"w-[133px]"} h-[44px] rounded-[8px] justify-center bg-[#69B04B] `}>
              <CheckCircleOutlineIcon
                // style={{ width: "38px", height: "38px", color: "#FFF" }}
                style={{ width: `${size.width < 420 ? '28px' : '35px'}`,
                 height:`${size.width < 420 ? '28px' : '35px'}`, color: '#FFF' }}
            
              />
              <p className="text-[#FFF] text-[18px] text-base  md:text-[15px] lg:text-[20px]  font-normal ">Optimal</p>
            </div>
          ) : (
            //  alert
            <div className={` flex p-6 px-8 items-center gap-2  ${size.width<420? "w-[100px]":"w-[133px]"} h-[44px] rounded-[8px] justify-center bg-[#DC362E] `}>
            <WarningTwoIcon  style={{ width: `${size.width < 420 ? '20px' : '25px'}`,
                 height:`${size.width < 420 ? '20px' : '25px'}`, color: '#FFF' }}/>
              <div>
                <p className={`flex items-center text-[18px]  ${size.width<420? "w-[50px]":"w-[58px]"}  text-white font-roboto text-base font-normal `}>
                  {alertS} Alert
                </p>
              </div>
            </div>
          )}
        </div>
        {/* chart part */}

        <div className="w-[95%] h-[200px] ">
          <Linechart  chart={chart}/>
        </div>

        {/* top diver */}

        <div
          style={{ justifyContent: "center" }}
          className="flex items-center  w-[100%] p-3 justify-between  "
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
            className="text-xs md:text-xs lg:text-xs xl:text-xs"
          >
            Top Drivers
          </p>
          <div style={lineStyle}></div>
          <div className="flex w-[37%] ml-[10px] justify-between ">
            <p
              className="text-xs md:text-xs lg:text-[10px] xl:text-[13px] w-[50%] text-[#AEA9B1] text-right font-[400]"
            >
             {formattedDate}
            </p>
            <p
              className="text-xs md:text-xs lg:text-xs xl:text-xs w-[50%] text-[#AEA9B1] text-right font-[400]"
            >
             {formattedTime}
            </p>
          </div>
        </div>

        {/* mid part of div */}
        {/* Tabel */}
        <div className="w-full  p-4 ">
        
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
