import React, { useState, useEffect, useRef, useContext } from "react";
import { Select, Spinner } from "@chakra-ui/react";
import TransactionTable from "./TransactionTable";
import ReadMore from "./ReadMore";
import ExpertHistoryTable from "./ExpertHistoryTable";
import DownloadExcel from "./DownloadExcel";
import FloatingInput from "../../util/VisionUtils/FloatingInput";
import Paginator from "../../util/VisionUtils/Paginator";
import ExlCsvDownload from "../../util/VisionUtils/ExlCsvDownload";
import AskAnExpertHistoryTable from "./AskAnExpertHistoryTable";
import { filter } from "d3-array";
import axios from "axios";
import NavContext from ".././NavContext";
import { baseURL } from "../../index";

const AskAnExpertHistory = () => {
  const { auth } = useContext(NavContext);

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRange, setSelectedRange] = useState(0);

  const [stateChanging, setStateChanging] = useState(false);
  const [changingbutton, setChangingbutton] = useState("All");

  const [homebadge, setHomebadge] = useState({
    badgeLogo: "/advisor/batchok.svg",
    badgeTag: "Proficient Inquirer",
  });

  const [startDate, setFromTime] = useState("");
  const [endDate, setToTime] = useState("");
  const [customStartDate, setCustomFromTime] = useState("");
  const [customEndDate, setCustomToTime] = useState("");

  const handleClick = () => {
    setStateChanging(false);
    // apiCall();
    // Convert custom dates to milliseconds
    const customStartTimeInMs = new Date(customStartDate).getTime();
    const customEndTimeInMs = new Date(customEndDate).getTime();

    // Call API with custom values
    fetchQueries(customStartTimeInMs, customEndTimeInMs);
  };

  const handleRangeSelect = (e) => {
    setSelectedRange(e.target.value);

    // Get the current time
    const currentTime = new Date().getTime();

    // Calculate start and end times based on the selected range
    let startTime, endTime;

    switch (e.target.value) {
      case "0": // All Time
        // Set startTime to the beginning of the year 2022
        startTime = new Date("2022-01-01T00:00:00").getTime();
        // Set endTime to the current time
        endTime = currentTime;
        break;

      case "1": // Last Seven Days
        startTime = currentTime - 7 * 24 * 60 * 60 * 1000;
        endTime = currentTime;
        console.log("1", startTime, endTime);
        break;

      case "2": // This Month
        const startOfMonth = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1,
          0,
          0,
          0
        ).getTime();
        startTime = startOfMonth;
        endTime = currentTime;
        break;

      case "3": // This Quarter
        let currentMonth = new Date(currentTime).getMonth();
        let startQuarter = currentMonth - (currentMonth % 3);
        startTime = new Date(
          new Date().getFullYear(),
          startQuarter,
          1,
          0,
          0,
          0
        ).getTime();
        endTime = currentTime;
        break;

      case "4": // Previous Quarter
        let currentMonthPre = new Date(currentTime).getMonth();

        const startPreviousQuarter =
          currentMonthPre - (currentMonthPre % 3) - 3;
        startTime = new Date(
          new Date().getFullYear(),
          startPreviousQuarter,
          1,
          0,
          0,
          0
        ).getTime();
        endTime = new Date(
          new Date().getFullYear(),
          startPreviousQuarter + 2,
          31,
          23,
          59,
          59
        ).getTime();
        break;

      case "5": // This Year
        const startOfYear = new Date(
          new Date().getFullYear(),
          0,
          1,
          0,
          0,
          0
        ).getTime();
        startTime = startOfYear;
        endTime = currentTime;
        break;

      // case "6": // Custom Range
      //   // Use the selected startDate and endDate
      //   startTime = new Date(customStartDate).getTime();
      //   endTime = new Date(customEndDate).getTime();
      //   setCustomFromTime(startTime);
      //   setCustomToTime(endTime)
      //   console.log("cust", startTime,endTime)
      //   break;

      default:
        break;
    }

    // Update state with the calculated start and end times
    setFromTime(startTime);
    setToTime(endTime);
    console.log("www", startTime, endTime);
    // Call API when a new range is selected
    if (e.target.value !== "6") {
      fetchQueries(startTime, endTime);
    }
  };

  const [displayData, setDisplayData] = useState([]);

  const fetchQueries = async (startTime = null, endTime = null) => {
    try {
      // let data = [
      //   {
      //     enquirer: "Sudhanshu Kumar",
      //     date: 1701770400,
      //     time: "12:30 pm",
      //     status: "Pending",
      //     company: "Asianpaints",
      //     queries:
      //       "What steps can we take to reduce our environmental impact and comply with regulation ?",
      //     deadline: "72 Hours",
      //     id: 1,
      //   },
      //   {
      //     enquirer: "Sudhanshu Kumar",
      //     date: 1699147800,
      //     time: "12:30 pm",
      //     status: "Inprogress",
      //     company: "Asianpaints",
      //     queries: "How can we improve our product quality?",
      //     deadline: "48 Hours",
      //     id: 2,
      //   },
      //   {
      //     enquirer: "Sudhanshu Kumar",
      //     date: 1699147800,
      //     time: "12:30 pm",
      //     status: "Answered",
      //     company: "Asianpaints",
      //     queries: "What is the best marketing strategy for our new product?",
      //     deadline: "24 Hours",
      //     id: 3,
      //   },
      //   {
      //     enquirer: "Sudhanshu Kumar",
      //     date: 1699147800,
      //     time: "12:30 pm",
      //     status: "Pending",
      //     company: "Asianpaints",
      //     queries: "How can we optimize our software development process?",
      //     deadline: "72 Hours",
      //     id: 4,
      //   },
      //   {
      //     enquirer: "Sudhanshu Kumar",
      //     date: 1699147800,
      //     time: "12:30 pm",
      //     status: "Inprogress",
      //     company: "Asianpaints",
      //     queries: "Discussing potential collaboration opportunities",
      //     deadline: "48 Hours",
      //     id: 5,
      //   },
      //   {
      //     enquirer: "Sudhanshu Kumar",
      //     date: 1699147800,
      //     time: "12:30 pm",
      //     status: "Answered",
      //     company: "Asianpaints",
      //     queries: "Seeking advice on adopting new technologies",
      //     deadline: "24 Hours",
      //     id: 6,
      //   },
      //   {
      //     enquirer: "Sudhanshu Kumar",
      //     date: 1699147800,
      //     time: "12:30 pm",
      //     status: "Answered",
      //     company: "Asianpaints",
      //     queries: "Seeking advice on adopting new technologies",
      //     deadline: "24 Hours",
      //     id: 7,
      //   },
      //   {
      //     enquirer: "Sudhanshu Kumar",
      //     date: 1699147800,
      //     time: "12:30 pm",
      //     status: "Answered",
      //     company: "Asianpaints",
      //     queries: "Seeking advice on adopting new technologies",
      //     deadline: "24 Hours",
      //     id: 8,
      //   },
      //   {
      //       enquirer: "Sudhanshu Kumar",
      //       date: 1699147800,
      //       time: "12:30 pm",
      //       status: "Answered",
      //       company: "Asianpaints",
      //       queries: "Seeking advice on adopting new technologies",
      //       deadline: "24 Hours",
      //       id: 9,
      //     },
      //     {
      //       enquirer: "Sudhanshu Kumar",
      //       date: 1699147800,
      //       time: "12:30 pm",
      //       status: "Answered",
      //       company: "Asianpaints",
      //       queries: "Seeking advice on adopting new technologies",
      //       deadline: "24 Hours",
      //       id: 10,
      //     },
      // ];
      let requestData = null;

      if (startTime != null && endTime !== null) {
        // If startTime and endTime are provided, create the request data
        requestData = {
          startDate: startTime,
          endDate: endTime,
        };
      }
      // if (customStartDate !== null && customEndDate !== null) {
      //   // If startTime and endTime are provided, create the request data
      //   requestData = {
      //     startDate: customStartDate,
      //     endDate: customEndDate,
      //   };
      // }
      const response = await axios.post(
        baseURL + "questions/expert",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );

      const statusOrder = ["Pending", "Inprogress", "Answered"];

      // Custom sort function
      const data = response?.data.data.sort(
        (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
      );
      setTableData(data);
      setFilteredData(data);
      // console.log("date in fetch ", requestData);
     
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  useEffect(() => {
    fetchQueries();
  }, []);
  const handleStatus = (selectedStatus) => {
    setChangingbutton(selectedStatus);
    if (selectedStatus === "All") {
      setFilteredData(tableData);
    } else {
      let filtered = tableData.filter((item) => item.status === selectedStatus);
      setFilteredData(filtered);
    }
  };
  

  return (
    <div className="mt-[3vh] flex flex-col w-full gap-2">
      <div className="w-full flex justify-between items-center">
        <p className="text-[20px] sm:text-[20px] font-semibold text-[#024D87]">
          Luc's Dashboard
        </p>
        <div className="">
            <div className="flex min-w-[110px]  items-center">
              <Select
                borderColor="#CAC5CD"
                color="#605D64"
                variant="outline"
                className="!text-sm !font-medium text-[#605D64]"
                _focus={{ borderColor: "blue.500" }}
                onChange={(e) => handleRangeSelect(e)}
                value={selectedRange}
              >
                <option
                  key="All Time"
                  value={0}
                  className="bg-white hover:bg-blue-200"
                >
                  All time
                </option>
                <option
                  key="Last Seven Days"
                  value={1}
                  className="bg-white hover:bg-blue-200"
                >
                  Last Seven Days
                </option>
                <option
                  key="This Month"
                  value={2}
                  className="bg-white hover:bg-blue-200"
                >
                  This Month
                </option>
                <option
                  key="This Quarter"
                  value={3}
                  className="bg-white hover:bg-blue-200"
                >
                  This Quarter
                </option>
                <option
                  key="Previous Quarter"
                  value={4}
                  className="bg-white hover:bg-blue-200"
                >
                  Previous Quarter
                </option>
                <option
                  key="This Year"
                  value={5}
                  className="bg-white hover:bg-blue-200"
                >
                  This Year
                </option>
                <option
                  key="custom"
                  value={6}
                  className="bg-white hover:bg-blue-200"
                >
                  Custom Range
                </option>
              </Select>
            </div>
            {selectedRange == 6 && (
              <div className="gap-2 flex justify-end">
                <div className="min-w-[110px]">
                  <FloatingInput
                    text="From"
                    type="date"
                    setDateTime={setCustomFromTime}
                    value={customStartDate}
                  />
                </div>

                <div className="min-w-[110px]">
                  <FloatingInput
                    text="To"
                    type="date"
                    setDateTime={setCustomToTime}
                    value={customEndDate}
                  />
                </div>
                <div>
                  <button
                    className="text-center py-2 px-2 text-white text-xs md:text-base font-medium bg-[#6CA6FC] rounded-md min-w-[80px]"
                    onClick={handleClick}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
      </div>
      {/* bottom white background part */}
      <div className="flex flex-col w-full h-full gap-[18px]  bg-white p-4 rounded-xl">
        

        {/* <div className="w-full flex justify-evenly">
        
          <div className="w-[380px] p-0 flex h-full rounded-lg ">
            <div className="w-[90px] h-[70px] flex justify-center items-center p-0 bg-[#FFFFC4] rounded-tl-lg  rounded-bl-lg">
              <img src="/advisor/yellowques.svg" alt="" />
            </div>
            <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-0">
              <p className="text-[#605D64] text-[18px] font-semibold">3</p>
              <p className="text-[#605D64] text-[14px] ">New queries</p>
            </div>
          </div>
     
          <div className="w-[380px] p-0 flex h-full rounded-lg ">
            <div className="w-[90px] h-[70px] flex justify-center items-center p-0 bg-[#CDEEBF] rounded-tl-lg  rounded-bl-lg">
              <img src="/advisor/greenques.svg" alt="" />
            </div>
            <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-0">
              <p className="text-[#605D64] text-[18px] font-semibold">3</p>
              <p className="text-[#605D64] text-[14px] ">Active queries</p>
            </div>
          </div>
    

          <div className="w-[380px] p-0 flex h-full rounded-lg ">
            <div className="w-[90px] h-[70px] flex justify-center items-center p-0 bg-[#CBE3FB] rounded-tl-lg  rounded-bl-lg">
              <img src="/advisor/blueques.svg" alt="" />
            </div>
            <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-0">
              <p className="text-[#605D64] text-[18px] font-semibold">3</p>
              <p className="text-[#605D64] text-[14px] ">Answered queries</p>
            </div>
          </div>
        </div> */}
        <div className=" flex items-center rounded-lg shadow-md">
          <div className=" flex items-center gap-3 p-6 w-1/2">
            <div className="rounded-full">
              <img
                src="/askanexperthistory.png"
                className="w-full object-cover rounded-full"
                alt="img"
              />
            </div>
            <div className="">
              <p className="text-[18px] font-[600] text-[#1C56AC]">
                Hello Luc!
              </p>
              <p className="text-[#938F96] text-[14px] font-[500] ">
                You have <span className="text-[#FFC107]">2 new questions</span>{" "}
                to be answered. You have{" "}
                <span className="text-[#6CA6FC]">answered 80%</span> of the
                queries this week.
              </p>
              <p className="text-[#938F96] text-[14px] font-[500] ">
                Thank you for your expertise.
              </p>
            </div>
          </div>
          <div className="bg-[#124CA2] text-[#FAFAFA] w-1/2 h-[140px] rounded-r-lg flex items-center gap-[56px] pl-[46px]">
            <div className="">
              {/* <div className="mb-3">
                <img src="/questionmarkorange.svg" alt="questionmark" />
              </div> */}
              <p className="text-[40px] font-[500]">2</p>
              <p className="text-[14px] font-[400]">In Progress</p>
            </div>
            <div>
              {/* <div className="mb-3">
                <img src="/questionmarkgreen.svg" alt="questionmark" />
              </div> */}
              <p className="text-[40px] font-[500]">2</p>

              <p className="text-[14px] font-[400]">Pending</p>
            </div>
            <div>
              {/* <div className="mb-3">
                <img src="/questionmarkblue.svg" alt="questionmark" />
              </div> */}
              <p className="text-[40px] font-[500]">6</p>
              <p className="text-[14px] font-[400]">Answered questions</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[60px] flex justify-between">
          {/* filter button */}
          <div className=" w-[500px]  flex gap-3 justify-start p-1">
            <button
              className={`w-[80px] flex justify-center items-center ${
                changingbutton == "All"
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-full px-[16px] py-[8px] `}
              onClick={() => handleStatus("All")}
            >
              <p className="text-[#605D64]">All</p>
            </button>
            <button
              className={`w-[120px] flex justify-center items-center ${
                changingbutton == "Inprogress"
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-full px-[16px] py-[8px] `}
              onClick={() => handleStatus("Inprogress")}
            >
              <p className="text-[#605D64]">In progress</p>
            </button>
            <button
              className={`w-[80px] flex justify-center items-center ${
                changingbutton == "Pending"
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-full px-[16px] py-[8px] `}
              onClick={() => handleStatus("Pending")}
            >
              <p className="text-[#605D64]">Pending</p>
            </button>

            <button
              className={`w-[100px] flex justify-center items-center ${
                changingbutton == "Answered"
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-full px-[16px] py-[8px] `}
              onClick={() => handleStatus("Answered")}
            >
              <p className="text-[#605D64]">Answered</p>
            </button>
          </div>
          {/* paginator */}
          <div className="w-[400px]  flex justify-evenly items-center p-2 ">
            <ExlCsvDownload
              data={[""]}
              order={[""]}
              orderDetail={[""]}
              enable={true}
            />
            <div className="flex justify-end gap-3 ">
              <Paginator
                data={filteredData}
                limit={5}
                setDisplayData={setDisplayData}
              />
            </div>
          </div>
        </div>

        <div>
          {displayData && displayData.length != 0 && (
            <AskAnExpertHistoryTable rowData={displayData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AskAnExpertHistory;
