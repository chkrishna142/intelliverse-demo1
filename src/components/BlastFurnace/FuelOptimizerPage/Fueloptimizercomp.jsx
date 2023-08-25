import { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import Rca from "../StabilityandThermalPage/Rca";
import Overviewfuelrate from "./Overviewfuelrate";
import Overviewcokerate from "./Overviewcokerate";
import Overviewpci from "./Overviewpci";
import Overviewetaco from "./Overviewetaco";
import Overviewheatflux from "./Overviewheatflux";
import Overviewrecommendation from "./Overviewrecommendation";
// import StabilityInd from "./StabilityInd";
// import Rca from "./Rca";
// import ThermalIndicator from "./ThermalIndicator";
// import Recommendations from "./Recommendations";

const Fueloptimizercomp = () => {
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
  const [isExpanded5, setIsExpanded5] = useState(true);
  const handleToggle5 = () => {
    setIsExpanded5((prevExpanded) => !prevExpanded);
  };

  const [page, setPage] = useState("Overview");

  const series = [
    {
      data: [
        {
          x: "Current Value",
          y: [15, 25],
          fillColor: "#FFC107",
        },
        {
          x: "RAFT", // First instance of Oxygen Enrichment
          y: [25, 45],
          seriesIndex: 1, // Unique identifier
        },
        {
          x: "PCI",
          y: [30, 70],
        },
        {
          x: "Blast Moisture",
          y: [50, 80],
        },
        {
          x: "Oxygen Enrichment",
          y: [70, 40],
        },
        {
          x: "Cold Blast Volume",
          y: [60, 30],
        },
        // {
        //   x: 'Oxygen Enrichmen', // Second instance of Oxygen Enrichment
        //   y: [45, 30],
        //   seriesIndex: 2 // Unique identifier
        // },
        {
          x: "Final Value",
          y: [30, 15],
          fillColor: "#FFC107",
        },
      ],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "rangeBar",
      toolbar: {
        show: false, // Disabling the toolbar
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // Vertical bars
      },
    },
    xaxis: {
      type: "category", // Using categories for x-axis labels,
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
        show: false, // Hide y-axis data labels
      },
    },
  };

  return (
    <div className="w-full h-full  flex flex-col     ">
      <Tabs>
        <TabList className="!flex !border-2 h-11 rounded-xl">
          <div className="flex items-center gap-4">
            {/* overview */}
            <Tab
              className={
                page === "Overview"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("Overview")}
            >
              Overview
            </Tab>
            {/* solution loss */}
            <Tab
              className={
                page === "Solution Loss Carbon"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("Solution Loss Carbon")}
            >
              Solution Loss Carbon
            </Tab>
            {/* reduction indirect */}
            <Tab
              className={
                page === "Reduction Indirect"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("Reduction Indirect")}
            >
              Reduction Indirect
            </Tab>
            {/* flame temp */}
            <Tab
              className={
                page === "Flame Temperature"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("Flame Temperature")}
            >
              Flame Temperature
            </Tab>
            {/* etaco */}
            <Tab
              className={
                page === "etaCO"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("etaCO")}
            >
              etaCO
            </Tab>
            {/* reduction direct */}
            <Tab
              className={
                page === "Reduction Direct"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("Reduction Direct")}
            >
              Reduction Direct
            </Tab>
          </div>
        </TabList>

        <TabPanels>
          <TabPanel className=" flex flex-col !pl-0 !pr-0 gap-3">
            <Overviewfuelrate
              isExpanded1={isExpanded1}
              handleToggle1={handleToggle1}
            />
            <div className="flex w-full h-full bg-white p-4 rounded-xl  shadow-md ">
              <Overviewcokerate
                isExpanded2={isExpanded2}
                handleToggle2={handleToggle2}
              />
              <Overviewpci
                isExpanded2={isExpanded2}
                handleToggle2={handleToggle2}
              />
            </div>
            <div className="flex w-full h-full bg-white p-4 rounded-xl  shadow-md ">
              <Overviewetaco
                isExpanded3={isExpanded3}
                handleToggle3={handleToggle3}
              />
              <Overviewheatflux
                isExpanded3={isExpanded3}
                handleToggle3={handleToggle3}
              />
            </div>
            <Rca
              isExpanded2={isExpanded4}
              handleToggle2={handleToggle4}
              series={series}
              options={options}
            />
            <Overviewrecommendation isExpanded2={isExpanded5}
              handleToggle2={handleToggle5}/>

          </TabPanel>

          <TabPanel className=" flex flex-col !pl-0 !pr-0 gap-3">
           <p>solution loss carbon</p>
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
           <p>reduction indirect</p> 
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
           <p>Flame temp</p> 
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
           <p>Eta co</p> 
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
           <p>Reduction direct</p> 
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <div class="flex justify-end ">
          <Modelaccuracy />
        </div>  */}
    </div>
  );
};

export default Fueloptimizercomp;
