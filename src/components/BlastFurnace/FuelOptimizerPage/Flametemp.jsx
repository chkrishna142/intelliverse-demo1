import { useState } from "react";
import Linechart from "../../Charts/BF_Charts/Linechart";
import Splinechart from "../../Charts/BF_Charts/Splinechart";


const Flametemp = ({name,current,min,max,impact}) => {
  const [isExpanded1, setIsExpanded1] = useState(true);
  const handleToggle1 = () => {
    setIsExpanded1((prevExpanded) => !prevExpanded);
  };



  const [flametemp, setFlametemp] = useState({
    series: [
      {
        name: "Actual ",
        data: [2260, 2250, 2289,2295, 2289, 2287, 2298, 2289, 2299, 2287, 2290 ],
      },
    ],
  
    options: {
      // ... (other options you have defined)
  
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
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
  
    //  
  
      grid: {
        borderColor: "#e7e7e7",
        strokeDashArray: 5,
        padding: {
          top: 0,
          right: 10,
          bottom: 0,
          left: 20,
        },
      },
      markers: {
        size: 1,
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'right',
        horizontalAlign: 'right',
        floating: false,
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        inverseOrder: false,
        width: 100,
        height: 100,
        labels: {
          colors: undefined,
          useSeriesColors: false,
        },
      },
      xaxis: {
        categories: [
          "12 pm ",
          "1 pm ",
          "2 pm ",
          "3 pm ",
          "4 pm ",
          "5 pm ",
          "6 pm ",
          "7 pm ",
          "8 pm ",
          "9 pm ",
          "10 pm ",
        ],
       
        title: {
            text: "Time",
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "#938F96",
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
            },
        },
      },
  
      yaxis: {
        // title: {
        //   text: "Temperature",
        // },
        // min: 9.0,
        // max: 12.0,
        tickAmount: 4,
        title: {
            text: "Value",
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "#938F96",
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
            },
        },
        
      },
  
      colors: ["#6CA6FC", "#69B04B"], // Set the colors for the first and second series
      dataLabels: {
        enabled: [true, false], // Enable for Series 1, disable for Series 2
        enabledOnSeries: [0],
        style: {
          fontSize: 14,
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
     
  
      // Adding the annotations for y-axis range
      annotations: {
        yaxis: [
          {
            y: {min},
            y2: {max},
            borderColor: "#000",
            fillColor: "rgba(105, 176, 75, 0.16)            ",
            label: {
              text: "Y-axis range",
            },
          },
        ],
      },
    },
  });

  const [splineChart, setSplineChart] = useState({
    series: [
      {
        name: '524-545',
        data: [0, 18, 15, 17, 8, 0],
      },
      {
        name: '545-555',
        data: [0, 0, 5, 22, 24, 0],
      },
      {
        name: '555-561',
        data: [0, 10, 15, 35, 30, 0],
      },
      {
        name: '561-593',
        data: [0, 5, 10, 50, 15, 0, 0],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: [1, 1, 1, 1],
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'right',
        horizontalAlign: 'right',
        floating: false,
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        inverseOrder: false,
        width: 120,
        height: 100,
        labels: {
          colors: undefined,
          useSeriesColors: false,
        },
        markers: {
          width: 30,
          height: 10,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 2,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
      },
      },
      colors: ['#2660B6', '#F77F00', '#69B04B', '#DC362E'],
      xaxis: {
        categories: ['2080', '2180', '2280', '2380', '2480', '2580'],
        title: {
            text: "Flame Temperature °C ",
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "#938F96",
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
            },
        },
      },
      yaxis:{
        title: {
            text: "Density",
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "#938F96",
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
            },
        },
      }
    },
  });
  

 

  return (
    <div className="flex flex-col w-full h-full bg-white p-4 rounded-xl  shadow-md ">
    {/* top */}
    <div class="flex justify-between w-full ">
      <div class="flex flex-col items-start justify-center gap-[12px] w-[100%] ">
        <div className="flex   items-center gap-[8px] w-[90%] justify-between ">
          {" "}
          {/* top */}
          <div className="flex w-full ">

          <div class=" flex w-full text-[22px] text-[#3E3C42] font-medium  ">
            <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px] ">
            {name}
            </p>
            <p class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal">&deg;C</p>
          </div>
          {/* <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"> &deg;C
          </div> */}
          </div>
          <div className="flex  items-center  w-full  justify-between ">
        {/* <Mymodal  imageone={"/Bficons/fuelrateTop.svg"} imageTwo={""} /> */}
            <div className="">
                <p className="text-[#084298] font-semibold" >2290</p>
                <p className="text-[#AEA9B1] ">Current</p>
            </div>
            <div className="" >
                <p className="font-semibold">2280 - 2375</p>
                <p className="text-[#AEA9B1] ">Ideal operation Band</p>
            </div>

        </div>
          {/* legends */}
         
        </div>
        <div className={`flex items-start gap-[2%] w-[80%] `}>
          <div className="flex gap-[2px] items-center justify-center ">
            <div className="flex gap-[2px] ">
            <img src="/Bficons/darkblue.svg" alt="" />

            </div>
            <div class="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
              {" "}
             Actual 
            </div>
          </div>
          <div className="flex gap-[2px] ">
            <div>
            <img src="/Bficons/darkgreendot.svg" alt="" />
            </div>
            <div class="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
            Ideal Operation Band
            </div>
          </div>
        </div>
      
          

         
      
        
      </div>
      <div onClick={handleToggle1}>
        <img src="/dropicon.svg" alt="" />
      </div>
    </div>
    {/* bottom */}
    {isExpanded1 && (
       
          <div className={`flex gap-[12px] w-full  h-full `}>
            
            {/* charts */}
            <div class={` w-[100%] flex flex-col  h-full    items-start   p-[12px] gap-[100px] flex-shrink-0 rounded-[12px] `}>
              
              <div  className="h-[300px] w-full  ">
              <Linechart  chart={flametemp}/>
              </div>
              <div  className=" h-[500px] w-full ">
              <Splinechart  chart={splineChart}/>
              </div>
            </div>
          </div>
      
    )}
  </div>
  );
};

export default Flametemp;
