import { useState } from "react";
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


  const [isExpanded1, setIsExpanded1] = useState(true);
  const handleToggle1 = () => {
    setIsExpanded1((prevExpanded) => !prevExpanded);
  };
  const [isExpanded2, setIsExpanded2] = useState(true);
  const handleToggle2 = () => {
    setIsExpanded2((prevExpanded) => !prevExpanded);
  };
  const [isExpanded3, setIsExpanded3] = useState(true);
  const handleToggle3 = () => {
    setIsExpanded3((prevExpanded) => !prevExpanded);
  };
  const [isExpanded4, setIsExpanded4] = useState(true);
  const handleToggle4 = () => {
    setIsExpanded4((prevExpanded) => !prevExpanded);
  };

  const [page, setPage] = useState("StabilityIndicator");

  return (
    <div className="w-full h-full  flex flex-col     ">
      <Tabs>
        <TabList className="!flex !border-2 h-11 rounded-xl  ">
          <div className="flex items-center gap-4">
            <Tab
              className={
                page === "StabilityIndicator"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("StabilityIndicator")}
            >
              Stability Indicator
            </Tab>
            {/* <Tab
              className={
                page === "RCA"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("RCA")}
            >
              RCA
            </Tab> */}
            <Tab
              className={
                page === "ThermalIndicator"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("ThermalIndicator")}
            >
              Thermal Indicator
            </Tab>

            <Tab
              className={
                page === "Recommendations"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("Recommendations")}
            >
              Recommendations
            </Tab>
          </div>
        </TabList>

        <TabPanels>
          <TabPanel className=" flex flex-col !pl-0 !pr-0 gap-3">
            <StabilityInd
              isExpanded1={isExpanded1}
              handleToggle1={handleToggle1}
            />
            <Rca isExpanded2={isExpanded2} handleToggle2={handleToggle2} series={series} options={options}/>
          </TabPanel>

          <TabPanel className=" flex flex-col !pl-0 !pr-0 gap-3">
            <ThermalIndicator
              isExpanded3={isExpanded3}
              handleToggle3={handleToggle3}
            />
            <Rca isExpanded2={isExpanded2} handleToggle2={handleToggle2} series={series} options={options}/>
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <Recommendations
              isExpanded4={isExpanded4}
              handleToggle4={handleToggle4}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <div class="flex justify-end ">
          <Modelaccuracy />
        </div>  */}
    </div>
  );
};

export default StabilityandThermal;
