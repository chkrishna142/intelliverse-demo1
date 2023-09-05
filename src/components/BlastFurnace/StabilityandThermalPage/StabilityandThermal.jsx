import { useEffect, useRef, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Modelaccuracy from "../BF_Components/Modelaccuracy";
import StabilityInd from "./StabilityInd";
import Rca from "./Rca";
import ThermalIndicator from "./ThermalIndicator";
import Recommendations from "./Recommendations";

const StabilityandThermal = () => {

  const series = [
    {
      data: [
        {
          x: 'Current Value',
          y: [15, 25],
          fillColor:  "#FFC107",
        },
        {
          x: 'Oxygen Enrichment', // First instance of Oxygen Enrichment
          y: [25, 45],
          seriesIndex: 1 // Unique identifier
        },
        {
          x: 'Cold Blast Volume',
          y: [30, 70]
        },
        {
          x: 'Flame Temperature',
          y: [50, 80]
        },
        {
          x: 'Stave Cooling I Heat Loss Total',
          y: [60, 80]
        },
        {
          x: 'Stave Temperature Row 9 (TB)',
          y: [80, 45]
        },
        // {
        //   x: 'Oxygen Enrichmen', // Second instance of Oxygen Enrichment
        //   y: [45, 30],
        //   seriesIndex: 2 // Unique identifier
        // },
        {
          x: 'Final Value',
          y: [30, 15],
          fillColor:  "#FFC107",
        }
      ]
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: 'rangeBar',
      toolbar: {
        show: false // Disabling the toolbar
      }
    },
    plotOptions: {
      bar: {
        horizontal: false // Vertical bars
      }
    },
    xaxis: {
      type: 'category' // Using categories for x-axis labels,
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
        show: false // Hide y-axis data labels
      }
    },
    
   
  };


  const [activeOption, setActiveOption] = useState("StabilityIndicator");

  const handleOptionClick = (option) => {
    setActiveOption(option);
    scrollToSection(option);
  };

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
   
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // const handleContainerScroll = (e) => {
  //   const container = e.target;
  //   const scrollPosition = container.scrollTop;

  //   const sections = ["StabilityIndicator", "ThermalIndicator", "Recommendations"];
  //   const sectionPositions = sections.map((section) => {
  //     const element = document.getElementById(section);
  //     return element.offsetTop;
  //   });
  //   console.log("Scroll Position:", scrollPosition);
  //   console.log("Section Positions:", sectionPositions);

  //   let newActiveOption = "StabilityIndicator";
  //   for (let i = sectionPositions.length - 1; i >= 0; i--) {
  //     if (scrollPosition >= sectionPositions[i]) {
  //       newActiveOption = sections[i];
  //       break;
  //     }
  //   }

  //   setActiveOption(newActiveOption);
  // };




  




  const [isExpanded1, setIsExpanded1] = useState(true);
  const handleToggle1 = () => {
    setIsExpanded1((prevExpanded) => !prevExpanded);
  };
  const [isExpanded2, setIsExpanded2] = useState(true);
  const handleToggle2 = () => {
    setIsExpanded2((prevExpanded) => !prevExpanded);
  };
  const [isExpanded21, setIsExpanded21] = useState(true);
  const handleToggle21 = () => {
    setIsExpanded21((prevExpanded) => !prevExpanded);
  };
  const [isExpanded3, setIsExpanded3] = useState(true);
  const handleToggle3 = () => {
    setIsExpanded3((prevExpanded) => !prevExpanded);
  };
  const [isExpanded4, setIsExpanded4] = useState(true);
  const handleToggle4 = () => {
    setIsExpanded4((prevExpanded) => !prevExpanded);
  };


  return (
    <div className="w-full h-full  flex flex-col     ">
      {/* nav */}
      <div className="flex flex-col w-[60%] p-[5px] gap-[14px] justify-left    ">
          {/* burden stability and modal button */}
        

          {/* nav started */}
          <div className="flex items-center     w-full gap-[20px] overflow-x-auto">
            {/* StabilityIndicator */}
            <div
              className={`flex items-center  w-[170px] justify-center    gap-[16px] p-[7px]  rounded-[15px] ${
                activeOption === "StabilityIndicator"
                  // ? "bg-white h-[40px] w-[100%] gap-[16px] whitespace-nowrap"
                  ? "bg-transparent text-[#938F96] whitespace-nowrap"

                  : "bg-transparent text-[#938F96] whitespace-nowrap"
              } `}
              onClick={() => handleOptionClick("StabilityIndicator")}
            >
              
                <p className="!text-xs  sm:!text-sm md:!text-base lg:!text-md ">
                  Stability Indicator
                </p>
            
            </div>

           

            {/* ThermalIndicator */}
            <div
              className={`flex items-center  w-[170px] justify-center   gap-[16px] p-[7px]  rounded-[15px] ${
                activeOption === "ThermalIndicator"
                 // ? "bg-white h-[40px] w-[100%] gap-[16px] whitespace-nowrap"
                 ? "bg-transparent text-[#938F96] whitespace-nowrap"

                 : "bg-transparent text-[#938F96] whitespace-nowrap"
              } `}
              onClick={() => handleOptionClick("ThermalIndicator")}
            >
              {/* <a
                href="#ThermalIndicator"
                onClick={() => handleOptionClick("ThermalIndicator")}
              > */}
                <p className="!text-xs  sm:!text-sm md:!text-base lg:!text-md ">
                  Thermal Indicator
                </p>
              {/* </a> */}
            </div>

            {/* recommendation */}
            <div
              className={`flex items-center  w-[170px] justify-center     gap-[16px] p-[7px]  rounded-[15px]  ${
                activeOption === "Recommendations"
                 // ? "bg-white h-[40px] w-[100%] gap-[16px] whitespace-nowrap"
                 ? "bg-transparent text-[#938F96] whitespace-nowrap"

                 : "bg-transparent text-[#938F96] whitespace-nowrap"
              } `}
              onClick={() => handleOptionClick("Recommendations")}
            >
              {/* <a
                href="#Recommendations"
                onClick={() => handleOptionClick("Recommendations")}
              > */}
                <p className="!text-xs  sm:!text-sm md:!text-base lg:!text-md ">
                  Recommendations
                </p>
              {/* </a> */}
            </div>
          </div>
        </div>
      
      {/* body */}
      <div className=" flex flex-col w-full gap-5  h-[62vh] overflow-y-auto " >

      <div id="StabilityIndicator" className="flex flex-col w-[100%] p-2 gap-4 flex-shrink-0 rounded-[12px ">
            <StabilityInd
              isExpanded1={isExpanded1}
              handleToggle1={handleToggle1}
            />
           
            <Rca isExpanded2={isExpanded2} handleToggle2={handleToggle2} series={series} options={options}/>
      </div>

     

     <div id="ThermalIndicator" className="flex flex-col gap-4 w-[100%] h-[auto]  p-2 flex-shrink-0 rounded-[12px] element transition-colors duration-1000 ease-in-out ">
        <ThermalIndicator isExpanded3={isExpanded3} handleToggle3={handleToggle3}/>
        <Rca isExpanded2={isExpanded21} handleToggle2={handleToggle21} series={series} options={options}/>

      </div>


       <div id="Recommendations" className="w-[100%] h-[auto] p-2 flex-shrink-0 rounded-[12px]  element transition-colors duration-1000 ease-in-out ">
        <Recommendations isExpanded4={isExpanded4} handleToggle4={handleToggle4}/>
        
      </div>
      </div>
    </div>
  );
};

export default StabilityandThermal;
