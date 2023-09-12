import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import BF_Home from "../BF_home/BF_Home";
import StabilityandThermal from "../StabilityandThermalPage/StabilityandThermal";
import Fueloptimizercomp from "../FuelOptimizerPage/Fueloptimizercomp";
import Footdisplay from "./Footdisplay";
import Siliconpredictor from "../Siliconpredictor/Siliconpredictor";
import HearthChart from "../Hearth/HearthChart";
import Impacttrackercharts from "../impacttracker/Impacttrackercharts";
import { useWindowSize } from "@uidotdev/usehooks";
import Particleswitchcomp from "./Particleswitchcomp";
import { useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../../..";
import NavContext from "../../NavContext";

const BF_Dashboard = () => {
  const navigate = useNavigate();

  const Capitalize = (str) => {
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    return str2;
  };

  const [page, setPage] = useState("dashboard");

  const size = useWindowSize();

  const [fetcheddata, setFetcheddata] = useState();

  const client = "jspl";
  const [workingurl,setWorkingurl] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // `http://10.36.0.105:8000/api/get_fuel_rate_and_production/?client_id=jspl`
          `https://15.206.88.112.nip.io:443/api/get_fuel_rate_and_production/?client_id=${client}`
        );
        const json = await response.json();
        // console.log("fetched data=====>>>",json);
        setFetcheddata(json);
        setWorkingurl(true);
      } catch (error) {
        setWorkingurl(false);
        console.error("Error fetching data:", error);
      }
    };
    // Fetch data initially
    fetchData();
  }, [client]);

  // ----------------------------------------------------------------------

    // const { auth } = useContext(NavContext)
  //   useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const response = await fetch(
  //                 `${baseURL}get_fuel_rate_and_production/?client_id=${client}`,
  //                 {
  //                     method: 'GET',
  //                     credentials: 'same-origin',
  //                     headers: {
  //                         'Content-Type': 'application/json',
  //                         'X-Auth-Token': auth
  //                     }
  //                 }
  //             );

  //             const json = await response.json();
  //             setFetcheddata(json);
  //         } catch (error) {
  //             console.error("Error fetching data:", error);
  //         }
  //     };
  //     fetchData();
  // }, [client, auth, baseURL]);



  // ----------------------------------------------------------------

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const pageshift = (pagename) => {
    setPage(pagename);
  };

  return (
    <div
      className={`  w-full ${size.width<768? "mt-[-5px]": "mt-6 "}`}
      style={{ width: size.width >= 768 ? "calc(100vw - 168px)" : "100vw" }}
    >
      <div className="flex justify-between mb-3 mt-0 ">
        <p className="text-3xl sm:text-4xl font-semibold text-[#024D87]">
          {/* {Capitalize(page)} */}
          Blast Furnace
        </p>
      </div>
      <Tabs index={activeTab} onChange={handleTabChange} >
        <TabList className={` !flex !border-0 mt-0`}>
          <div className="flex w-[80vw]  items-center gap-4 overflow-x-auto h-[50px] md:h-10">
            <Tab
              className={
                page === "dashboard"
                  ? "!text-black !text-xs sm:!text-sm whitespace-nowrap  !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm whitespace-nowrap  !text-[#938F96] !border-0"
              }
              onClick={() => {
                setPage("dashboard");
                navigate("/optimus/blastfurnace");
              }}
            >
              Dashboard
            </Tab>
            <Tab
              className={
                page === "fuel optimizer"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full whitespace-nowrap pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0 whitespace-nowrap"
              }
              onClick={() => {
                setPage("fuel optimizer");
                navigate("/optimus/blastfurnace");
              }}
            >
              Fuel Optimizer
            </Tab>
            <Tab
              className={
                page === "Stability & Thermal Performance"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full whitespace-nowrap pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0 whitespace-nowrap"
              }
              onClick={() => {
                setPage("Stability & Thermal Performance");
                navigate("/optimus/blastfurnace");
              }}
            >
              Stability & Thermal Performance
            </Tab>
            <Tab
              className={
                page === "Silicon Prediction"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full whitespace-nowrap pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0 whitespace-nowrap"
              }
              onClick={() => {
                setPage("Silicon Prediction");
                navigate("/optimus/blastfurnace");
              }}
            >
              Silicon Prediction
            </Tab>
            <Tab
              className={
                page === "Avg. particle size"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full whitespace-nowrap pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0 whitespace-nowrap"
              }
              onClick={() => {
                setPage("Avg. particle size");
                navigate("/optimus/blastfurnace");
              }}
            >
              Avg. particle size
            </Tab>
            <Tab
              className={
                page === "Hearth Liquid Level"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full whitespace-nowrap pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0 whitespace-nowrap"
              }
              onClick={() => {
                setPage("Hearth Liquid Level");
                navigate("/optimus/blastfurnace");
              }}
            >
              Hearth Liquid Level
            </Tab>
            <Tab
              className={
                page === "Impact Tracker"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full whitespace-nowrap pl-4 pr-4 pt-1 pb-1 !border !border-[#79767D]"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0 whitespace-nowrap"
              }
              onClick={() => {
                setPage("Impact Tracker");
                navigate("/optimus/blastfurnace");
              }}
            >
              Impact Tracker
            </Tab>
          </div>
        </TabList>
        <TabPanels className="">
          <TabPanel className="!pl-0 !pr-0 mb-[10px]">
            <BF_Home
              fetcheddata={fetcheddata}
              client={client}
              pageshift={pageshift}
              handleTabChange={handleTabChange}
              workingurl={workingurl}
            />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0 mb-[10px]">
            <Fueloptimizercomp fetcheddata={fetcheddata} />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0 mb-[10px] ">
            <StabilityandThermal />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0 mb-[10px]">
            <Siliconpredictor />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0 mb-[10px]">
            <Particleswitchcomp />
            {/* <MaterialSelectOfBf/> */}
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0 mb-[10px]">
            <HearthChart />
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0 mb-[10px]">
            <Impacttrackercharts />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className=" fixed bottom-0 w-[90%] rounded-xl h-[30px] bg-[#FFFFC4] ">
        <Footdisplay client={client} />
      </div>
    </div>
  );
};
export default BF_Dashboard;
