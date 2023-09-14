import { useEffect, useRef, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Modelaccuracy from "../BF_Components/Modelaccuracy";
import StabilityInd from "./StabilityInd";
import Rca from "./Rca";
import ThermalIndicator from "./ThermalIndicator";
import Recommendations from "./Recommendations";
import Cohesivezone from "./Cohesivezone";

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
          fillColor: "#605D64",
        },
        {
          x: 'Cold Blast Volume',
          y: [45, 70]
        },
        {
          x: 'Flame Temperature',
          y: [70, 100]
        },
        {
          x: 'Stave Cooling I Heat Loss Total',
          y: [70, 55]
        },
        {
          x: 'Stave Temperature Row 9 (TB)',
          y: [55, 35],
          fillColor: "#605D64",
        },
        // {
        //   x: 'Oxygen Enrichmen', // Second instance of Oxygen Enrichment
        //   y: [45, 30],
        //   seriesIndex: 2 // Unique identifier
        // },
        {
          x: 'Final Value',
          y: [35, 15],
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
      type: 'category' ,// Using categories for x-axis labels,
     tickPlacement: 'between',
   
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
  const [isExpanded5, setIsExpanded5] = useState(true);
  const handleToggle5 = () => {
    setIsExpanded5((prevExpanded) => !prevExpanded);
  };
  


  return (
    <div className="w-full h-[62vh] overflow-y-auto  flex flex-col    ">
      {/* nav */}
     
      
      {/* body */}
      

      <div id="StabilityIndicator" className="flex flex-col w-[100%] p-2 gap-4 flex-shrink-0 rounded-[12px ">
            <StabilityInd isExpanded1={isExpanded1} handleToggle1={handleToggle1}/>
            <Rca isExpanded2={isExpanded2} handleToggle2={handleToggle2} series={series} options={options}/>
      </div>

     

     <div id="ThermalIndicator" className="flex flex-col gap-4 w-[100%] h-[auto]  p-2 flex-shrink-0 rounded-[12px] element transition-colors duration-1000 ease-in-out ">
        <ThermalIndicator isExpanded3={isExpanded3} handleToggle3={handleToggle3}/>
        <Cohesivezone isExpanded5={isExpanded5} handleToggle5={handleToggle5} />
        <Rca isExpanded2={isExpanded21} handleToggle2={handleToggle21} series={series} options={options}/>

      </div>


       <div id="Recommendations" className="w-[100%] h-[auto] p-2 flex-shrink-0 rounded-[12px]  element transition-colors duration-1000 ease-in-out ">
        <Recommendations isExpanded4={isExpanded4} handleToggle4={handleToggle4}/>
        
      </div>
      
    </div>
  );
};

export default StabilityandThermal;
