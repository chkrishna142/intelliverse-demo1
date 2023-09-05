import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import Rca from "../StabilityandThermalPage/Rca";
import Overviewfuelrate from "./Overviewfuelrate";
import Overviewcokerate from "./Overviewcokerate";
import Overviewpci from "./Overviewpci";
import Overviewetaco from "./Overviewetaco";
import Overviewheatflux from "./Overviewheatflux";
import Overviewrecommendation from "./Overviewrecommendation";
import Flametemp from "./Flametemp";
import { useWindowSize } from "@uidotdev/usehooks";
// import StabilityInd from "./StabilityInd";
// import Rca from "./Rca";
// import ThermalIndicator from "./ThermalIndicator";
// import Recommendations from "./Recommendations";

const Fueloptimizercomp = ({ fetcheddata }) => {
  const size = useWindowSize();

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
  const difftabs = fetcheddata?.tools.fuel_rate.data;
  // console.log("difftabs",difftabs)
  const displayfun = () => {
    if(fetcheddata){
      difftabs.map((ele) => {
        console.log(ele);
      });
    }
    
  };

  useEffect(()=>{
    displayfun();
  },[])
  
  
  const [page, setPage] = useState("Overview");

  const series = [
    {
      data: [
        {
          x: "Current Value",
          y: [0, 25],
          fillColor: "#FFC107",
        },
        {
          x: "RAFT", // First instance of Oxygen Enrichment
          y: [25, 75],
          seriesIndex: 1, // Unique identifier
        },
        {
          x: "PCI",
          y: [75, 100],
        },
        {
          x: "Blast Moisture",
          y: [100, 110],
        },
        {
          x: "Oxygen Enrichment",
          y: [110, 97],
        },
        {
          x: "Cold Blast Volume",
          y: [97, 64],
        },
        // {
        //   x: 'Oxygen Enrichmen', // Second instance of Oxygen Enrichment
        //   y: [45, 30],
        //   seriesIndex: 2 // Unique identifier
        // },
        {
          x: "Final Value",
          y: [64, 15],
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
      // min: 0,
      // max: 100,
      labels: {
        show: false, // Hide y-axis data labels
      },
    },
  };

  if (difftabs) {
    return (
      <div className="w-full h-full  flex flex-col     ">
        <Tabs>
          <TabList className="!flex !border-0 h-11 rounded-xl w-full">
            <div className="flex items-center border-2 rounded-sm gap-4 w-[75vw] overflow-x-auto">
              <Tab
                className={
                  page === "Overview"
                    ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full whitespace-nowrap  pl-4 pr-4 pt-1 pb-1 !border-0"
                    : "!text-xs sm:!text-sm !text-[#938F96] whitespace-nowrap  !border-0"
                }
                onClick={() => setPage("Overview")}
              >
                Overview
              </Tab>

              {difftabs.map((ele) => {
                return (
                  <Tab
                    className={
                      page === ele.name
                        ? "!text-black !text-xs sm:!text-sm !bg-white whitespace-nowrap  rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                        : "!text-xs sm:!text-sm !text-[#938F96] whitespace-nowrap  !border-0"
                    }
                    onClick={() => setPage(ele.name)}
                  >
                    {ele.name}
                  </Tab>
                );
              })}
            </div>
          </TabList>

          <TabPanels>
            <TabPanel className="w-full flex flex-col !pl-0 !pr-0 gap-3">
              <Overviewfuelrate
                isExpanded1={isExpanded1}
                handleToggle1={handleToggle1}
              />
              <div
                className={`flex ${
                  size.width < 1400 ? "flex-col" : ""
                } w-full h-full bg-white p-4 rounded-xl  shadow-md `}
              >
                <Overviewcokerate
                  isExpanded2={isExpanded2}
                  handleToggle2={handleToggle2}
                />
                <Overviewpci
                  isExpanded2={isExpanded2}
                  handleToggle2={handleToggle2}
                />
              </div>
              <div
                className={`flex ${
                  size.width < 1400 ? "flex-col" : ""
                } w-full h-full bg-white p-4 rounded-xl  shadow-md `}
              >
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
              <Overviewrecommendation
                isExpanded2={isExpanded5}
                handleToggle2={handleToggle5}
              />
            </TabPanel>

            {difftabs.map((ele) => {
              return (
                <TabPanel className=" flex flex-col !pl-0 !pr-0 gap-3">
                  <Flametemp
                    name={ele.name}
                    current={ele.current}
                    min={ele.optimal_range[0]}
                    max={ele.optimal_range[1]}
                    impact={ele.impact}
                  />
                </TabPanel>
              );
            })}

            {/* <TabPanel className="!pl-0 !pr-0">
             <p>reduction indirect</p> 
             <Flametemp/>
            </TabPanel>
            <TabPanel className="!pl-0 !pr-0">
             <Flametemp/>
            </TabPanel>
            <TabPanel className="!pl-0 !pr-0">
             <p>Eta co</p> 
             <Flametemp/>
            </TabPanel>
            <TabPanel className="!pl-0 !pr-0">
             <p>Reduction direct</p> 
             <Flametemp/>
            </TabPanel> */}
          </TabPanels>
        </Tabs>
        {/* <div class="flex justify-end ">
            <Modelaccuracy />
          </div>  */}
      </div>
    );
  } else {
    <></>;
  }
};

export default Fueloptimizercomp;
